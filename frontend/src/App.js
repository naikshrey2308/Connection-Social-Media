import './App.css';
import React, { Suspense,createContext ,useContext} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Loader from './Pages/Loader';
import { LoginProvider } from './Contexts/loginContext';
import Navbar from './Components/Navbar';
import { useState, useEffect } from 'react';
const LoginPage = React.lazy(() => import("./Pages/LoginPage"));
const ChattingPage = React.lazy(() => import("./Pages/ChattingPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const UserProfileUpdate = React.lazy(() => import("./Pages/UserProfileUpdate"));
const UserProfile = React.lazy(() => import("./Pages/UserProfile"));
const Discover = React.lazy(() => import("./Pages/Discover"));
const Post = React.lazy(() => import("./Pages/Post"));


export const LoginStatusContext = createContext();

function App() {
	
	const [ IsLoggedIn, setIsLoggedIn ] = useState(false);
	const [ notChat, setNotChat ] = useState(true);

	function setNavbarFlag(flag){
		console.log("in app"+flag);
		setNotChat(flag);
	}


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
			(IsLoggedIn && notChat) && <Navbar /> 
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
					<LoginProvider>
						{IsLoggedIn ? <HomePage setNavbar={setNavbarFlag}/>: <LoginPage /> } 
					</LoginProvider>
					</Suspense>
				} />
				<Route path="chat" element={
					<Suspense fallback={<Loader/>}>
					<LoginProvider>
					{/* { setShow(true) } */}
					{IsLoggedIn ? <ChattingPage setNavbar={setNavbarFlag}/>: <LoginPage /> } 
					</LoginProvider>
					</Suspense>
				} />
				<Route path="discover" element={
					<Suspense fallback={<Loader/>}>
					<LoginProvider>
					{/* { setShow(true) } */}
					{IsLoggedIn ? <Discover setNavbar={setNavbarFlag}/>: <LoginPage /> } 
					</LoginProvider>
					</Suspense>
				} />
				<Route path="post" element={
					<Suspense fallback={<Loader/>}>
					<LoginProvider>
					{/* { setShow(true) } */}
					{IsLoggedIn ? <Post setNavbar={setNavbarFlag}/>: <LoginPage /> } 
					</LoginProvider>
					</Suspense>
				} />
				<Route path="users/*" element={
					<Suspense fallback={<Loader/>}>
					<LoginProvider>
					{/* { setShow(true) } */}
					{IsLoggedIn ? <UserProfile setNavbar={setNavbarFlag}/>: <LoginPage /> }
					</LoginProvider> 
					</Suspense>
				} />
				<Route path="updateProfile" element={
					<Suspense fallback={<Loader/>}>
					<LoginProvider>
					{/* { setShow(true) } */}
					{IsLoggedIn ? <UserProfileUpdate setNavbar={setNavbarFlag}/>: <LoginPage /> } 
					</LoginProvider>
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
