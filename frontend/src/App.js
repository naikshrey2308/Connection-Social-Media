import logo from './logo.svg';
import './App.css';

// import Login from './Components/Forms/Login';
// import LoginPage from './Pages/LoginPage';

import React, { Suspense,createContext ,useContext} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Loader from './Pages/Loader';

import { LoginProvider } from './Contexts/loginContext';
// import ShowContext from './Contexts/showContext';
// import { Show } from './Contexts/showContext';
import Navbar from './Components/Navbar';
import { useState, useEffect } from 'react';

const LoginPage = React.lazy(() => import("./Pages/LoginPage"));
const ChattingPage = React.lazy(() => import("./Pages/ChattingPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const UserProfileUpdate = React.lazy(() => import("./Pages/UserProfileUpdate"));
const UserProfile = React.lazy(() => import("./Pages/UserProfile"));
const Discover = React.lazy(() => import("./Pages/Discover"));
const Post = React.lazy(() => import("./Pages/Post"));


const LoginStatusContext = createContext();

function App() {
	
	const [ IsLoggedIn, setIsLoggedIn ] = useState(false);

	console.log(window.sessionStorage.getItem("password"));
	
	useEffect(() => {
		(async function() {
			if(window.sessionStorage.getItem("username")!==undefined){
  
				const user = {
				  username: window.sessionStorage.getItem("username"),
				  password: window.sessionStorage.getItem("password")
				}
				const req = await fetch("/user/login", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify(user),
				});
				const res = await req.json();
				console.log(res.isLoggedIn);
				if(res.isLoggedIn){
					setIsLoggedIn(true);
				}
		
				console.log(IsLoggedIn);
			  }
		})(); 
	}, []);

    return (
		<>
		<LoginStatusContext.Provider value={{ IsLoggedIn, setIsLoggedIn }}>
		<BrowserRouter>
		{
			{IsLoggedIn} && <Navbar /> 
		}	
			<Routes>
				<Route path="/">
				<Route index element={
					<Suspense fallback={<Loader/>}>
					<LoginProvider>
						{IsLoggedIn ? <HomePage/> : <LoginPage /> } 
					</LoginProvider> 
					</Suspense>
				} />
				<Route path="home" element={
					<Suspense fallback={<Loader/>}>
					{/* { setShow(true) } */}
					<HomePage/>
					</Suspense>
				} />
				<Route path="chat" element={
					<Suspense fallback={<Loader/>}>
					{/* { setShow(true) } */}
					<ChattingPage/>
					</Suspense>
				} />
				<Route path="discover" element={
					<Suspense fallback={<Loader/>}>
					{/* { setShow(true) } */}
					<Discover />
					</Suspense>
				} />
				<Route path="post" element={
					<Suspense fallback={<Loader/>}>
					{/* { setShow(true) } */}
					<Post />
					</Suspense>
				} />
				<Route path="user/*" element={
					<Suspense fallback={<Loader/>}>
					{/* { setShow(true) } */}
					<UserProfile />
					</Suspense>
				} />
				<Route path="updateProfile" element={
					<Suspense fallback={<Loader/>}>
					{/* { setShow(true) } */}
					<UserProfileUpdate/>
					</Suspense>
				} />
				</Route>
			</Routes>  
		</BrowserRouter>
		</LoginStatusContext.Provider>
		</>
    );
}

export default App;
