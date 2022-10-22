import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loader from './Pages/Loader';

import { LoginProvider } from './Contexts/loginContext';
import Navbar from './Components/Navbar';

const LoginPage = React.lazy(() => import("./Pages/LoginPage"));
const ChattingPage = React.lazy(() => import("./Pages/ChattingPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const UserProfileUpdate = React.lazy(() => import("./Pages/UserProfileUpdate"));
const UserProfile = React.lazy(() => import("./Pages/UserProfile"));
const Discover = React.lazy(() => import("./Pages/Discover"));
const Post = React.lazy(() => import("./Pages/Post"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={
            <Suspense fallback={<Loader/>}>
              <LoginProvider>
                <LoginPage/>  
              </LoginProvider> 
            </Suspense>
          } />
          <Route path="home" element={
            <Suspense fallback={<Loader/>}>
              <HomePage/>
            </Suspense>
          } />
          <Route path="chat" element={
            <Suspense fallback={<Loader/>}>
              <ChattingPage/>
            </Suspense>
          } />
          <Route path="discover" element={
            <Suspense fallback={<Loader/>}>
              <Discover />
            </Suspense>
          } />
          <Route path="post" element={
            <Suspense fallback={<Loader/>}>
              <Post />
            </Suspense>
          } />
          <Route path="user/*" element={
            <Suspense fallback={<Loader/>}>
              <UserProfile />
            </Suspense>
          } />
          <Route path="updateProfile" element={
            <Suspense fallback={<Loader/>}>
              <UserProfileUpdate/>
            </Suspense>
          } />
        </Route>
      </Routes>  
    </BrowserRouter>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
