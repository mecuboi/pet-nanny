import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home';
import Profile from './pages/Profile';
import TestProfile from './pages/TestProfile'
import FooterNav from './components/Footer'
// import Detail from './pages/Detail';
// import NoMatch from './pages/NoMatch';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
import Navigation from './components/Nav';
import NannyList from './pages/NannyList';
// import { StoreProvider } from './utils/GlobalState';
// import Success from './pages/Success';
// import OrderHistory from './pages/OrderHistory';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/profile:id"
              element={<Profile />}
            />
            <Route
              path="/testprofile"
              element={<TestProfile />}
            />


          </Routes>
          <FooterNav />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
