import { memo, useEffect, useState, useRef, useContext } from "react";
import LoginContext from "../../Contexts/loginContext";
// import ShowContext from "../../Contexts/showContext";

import "../../styles/login.css";
import validate from "../Reusables/Validator";
import  { useNavigate } from 'react-router-dom';
import { ReactSession }  from 'react-client-session';

function Form(props) {
    // var show = useContext(ShowContext);

    const [username, setUsername] = useState("");
    const [loginMessage, setLoginMessage] = useState(null);

    const { isLoginFormEnabled, setIsLoginFormEnabled } = useContext(LoginContext);

    const usernameInput = useRef();
    const passwordInput = useRef();

    const checkUsername = () => {
        validate("username", /^[a-zA-Z0-9_.]+$/, "usernameCorrector", "&cross; This field can only contain alphabets, numbers, . and _");
        setUsername(document.getElementById("username").value);
    }

    const changeForm = () => {
        setIsLoginFormEnabled(false);
    }
    let navigate= useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginParams = {
            username: usernameInput.current.value.toString().trim(),
            password: passwordInput.current.value.toString().trim(),
        }
        const req = await fetch("/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginParams),
        });
        const res = await req.json();
        
        setLoginMessage(res.data);

        // ReactSession.set("username", res.username);
        window.sessionStorage.setItem("username", res.username);

        window.sessionStorage.setItem("password", loginParams.password);
        // ReactSession.set("profilePic", res.profilePic);
        window.sessionStorage.setItem("profilePic", res.profilePic);

        window.sessionStorage.setItem("name", res.name);
        // ReactSession.set("name", res.name);

        // console.log(ReactSession.get("username"));
        if(res.isLoggedIn==true)
            // show(true);
            setIsLoginFormEnabled(true);
            navigate('/home')
        // setLoginMessage((!res.isLoggedIn) ? res.data : null);
    }

    useEffect(() => {
        
    }, []);
    
    return (
        <>
        <div className="main bg-light row g-0">
            <div className="col-12 mx-auto py-5 px-3 col-lg-5 col-md-6 col-sm-8 right-form">
                {(loginMessage) &&
                    <div className="alert alert-danger text-center">{loginMessage}</div>
                }    
                <div className="logo text-center mb-0 text-base"><span className="fs-4 text-dark">Login to</span> Connection</div>
                <p className="text-center text-secondary mt-0 fs-6">You connect to us, we connect you to the world!</p>
                <div className="form form-control mx-auto text-center border-0 mt-5">
                   
                    <form onSubmit={(event) => handleSubmit(event)} method="POST" action="" className="mx-xl-5 px-lg-5 px-md-4 px-2" autocomplete="off">
                        
                        <input ref={usernameInput} id="username" spellCheck="false" type="text" size="30" name="username" className="form-control" placeholder="Username" value={username} onChange={checkUsername} required={true} />
                        <p className="text-start" style={{fontSize: 12}} id="usernameCorrector"></p>
                        
                        <input ref={passwordInput} id="password" type="password" size="30" name="password" className="form-control" placeholder="Password" required={true} />
                        
                        <input type="submit" className="btn btn-base float-end mx-3 mt-5 px-4 submit" value="Login" />
                        
                        <button onClick={changeForm} id="changeForm" type="button" className="btn btn-light mt-5 float-end">Sign up instead</button>
                    </form>
               
                </div>
            </div>
        </div>
        </>
    );
}

function Login(props) {

    return (
        <div className="min-vh-100">
            {/* <Decorator /> */}
            <Form />
        </div>
    );
}

export default memo(Login);