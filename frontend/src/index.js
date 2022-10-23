import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Loader from './Pages/Loader';

// import { LoginProvider } from './Contexts/loginContext';
// import Navbar from './Components/Navbar';
// import { useState, useEffect } from 'react';

// const LoginPage = React.lazy(() => import("./Pages/LoginPage"));
// const ChattingPage = React.lazy(() => import("./Pages/ChattingPage"));
// const HomePage = React.lazy(() => import("./Pages/HomePage"));
// const UserProfileUpdate = React.lazy(() => import("./Pages/UserProfileUpdate"));
// const UserProfile = React.lazy(() => import("./Pages/UserProfile"));
// const Discover = React.lazy(() => import("./Pages/Discover"));
// const Post = React.lazy(() => import("./Pages/Post"));

// function Start() {
//   const [IsLoggedIn,setLoggedIn] = useState(false);

//   const [show, setShow] = useState(true);

//   useEffect(async () => {
//     alert("re");
//     if(window.sessionStorage.getItem("username")!==undefined){

//       const user = {
//         username: window.sessionStorage.getItem("username"),
//         password: window.sessionStorage.getItem("password")
//       }
//       const req = await fetch("/user/login", {
//           method: "POST",
//           headers: {
//               'Content-Type': 'application/json',
//               'Accept': 'application/json'
//           },
//           body: JSON.stringify(user),
//       });
//       const res = await req.json();
//       setLoggedIn(res.isLoggedIn);
//       console.log(res.isLoggedIn);
//     }
//   }, []);
  

//   return(
//     <>
  
//     <BrowserRouter>
//     <Navbar show={show} /> 
//       <Routes>
//         <Route path="/">
//           <Route index element={
//             <Suspense fallback={<Loader/>}>
//               <LoginProvider>
//                 { setShow(false) }
//                 {/* IsLoggedIn && <HomePage/> */}
//                 {/* !IsLoggedIn &&  */}<LoginPage/> 
//               </LoginProvider> 
//             </Suspense>
//           } />
//           <Route path="home" element={
//             <Suspense fallback={<Loader/>}>
//               { setShow(true) }
//               <HomePage/>
//             </Suspense>
//           } />
//           <Route path="chat" element={
//             <Suspense fallback={<Loader/>}>
//               { setShow(true) }
//               <ChattingPage/>
//             </Suspense>
//           } />
//           <Route path="discover" element={
//             <Suspense fallback={<Loader/>}>
//               { setShow(true) }
//               <Discover />
//             </Suspense>
//           } />
//           <Route path="post" element={
//             <Suspense fallback={<Loader/>}>
//               { setShow(true) }
//               <Post />
//             </Suspense>
//           } />
//           <Route path="user/*" element={
//             <Suspense fallback={<Loader/>}>
//               { setShow(true) }
//               <UserProfile />
//             </Suspense>
//           } />
//           <Route path="updateProfile" element={
//             <Suspense fallback={<Loader/>}>
//               { setShow(true) }
//               <UserProfileUpdate/>
//             </Suspense>
//           } />
//         </Route>
//       </Routes>  
//     </BrowserRouter>
//     <App />
//   </>
//   );

// }


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
