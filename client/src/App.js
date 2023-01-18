import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";


import Home from './pages/Home';
import Profile from './pages/Profile';
import FooterNav from './components/Footer';
import BookingPage from './pages/BookingPage'
import Navigation from './components/Nav';
import NannyList from './pages/NannyList';
import UpdateUserForm from './pages/UpdateUserForm';
import UploadImageForm from './pages/UploadImageForm'
import Nannyprofile from "./pages/Nannyprofile";
import Success from "./pages/Success"
import OrderList from './pages/OrderList'
import BookingList from './pages/BookingList'


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
              path="/me"
              element={<Profile />}
            />
            <Route 
            path="/profiles/:profileId" 
            element={<Profile />}
            />
            <Route
              path="/nannylist"
              element={<NannyList />}
            />
            <Route
              path="/nannylist/:_id"
              element={<Nannyprofile/>}
            />
            <Route
              path="/update-user-form"
              element={<UpdateUserForm />}
            />
            <Route
              path="/upload"
              element={<UploadImageForm />}
            />
            <Route 
                path="/bookingPage/:_id" 
                element={<BookingPage />} 
              />
              {/* FOR TESTING */}
            <Route 
                path="/orderlist" 
                element={<OrderList />} 
              />
            <Route 
                path="/bookinglist" 
                element={<BookingList />} 
              />
              <Route
            path="/success"
            element={<Success />}
            />
          </Routes>
          
          <FooterNav />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
