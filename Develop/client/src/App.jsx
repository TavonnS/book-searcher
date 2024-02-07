import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <>
      <Navbar />
      <Outlet />

      <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div>
    </ApolloProvider>

    </>
  );
}




export default App;

////////////////


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// import App from './App';

// const client = new ApolloClient({
//   uri: '/graphql', 
//   cache: new InMemoryCache(),
// });

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById('root')
// );