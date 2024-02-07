const { Book, User } = require('../models');

const resolvers = {
  Query: {
    getSingleUser: async (_, { id, username }) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: id }, { username: username }],
        });
        if (!foundUser) {
          throw new Error('User not found');
        }
        return foundUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    login: async (_, { username, email, password }) => {
      try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user || !(await user.isCorrectPassword(password))) {
          throw new AuthenticationError('Incorrect username/email or password');
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Failed to login');
      }
    },
    saveBook: async (_, { book }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('You need to be logged in!');
        }
        user.savedBooks.push(book);
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteBook: async (_, { bookId }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('You need to be logged in!');
        }
        user.savedBooks = user.savedBooks.filter((savedBook) => savedBook.bookId !== bookId);
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
