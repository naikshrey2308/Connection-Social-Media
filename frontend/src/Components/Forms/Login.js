import { memo, useEffect, useState } from "react";
import "../../styles/login.css";
import validate from "../Reusables/Validator";

function Form(props) {
    const [username, setUsername] = useState("");

    const checkUsername = () => {
        validate("username", /^[a-zA-Z0-9_.]+$/, "usernameCorrector", "&cross; This field can only contain alphabets, numbers, . and _");
        setUsername(document.getElementById("username").value);
    }

    useEffect(() => {

    }, []);

    return (
        <>
        <div className="main bg-light row g-0">
            <div className="col-12 mx-auto py-5 px-3 col-lg-5 col-md-6 col-sm-8 right-form">
                <div className="logo text-center mb-0 text-base"><span className="fs-4 text-dark">Login to</span> Connection</div>
                <p className="text-center text-secondary mt-0 fs-6">You connect to us, we connect you to the world!</p>
                <div className="form form-control mx-auto text-center border-0 mt-5">
                   
                    <form method="POST" action="" className="mx-xl-5 px-lg-5 px-md-4 px-2" autocomplete="off">
                        
                        <input id="username" spellCheck="false" type="text" size="30" name="username" className="form-control" placeholder="Username" value={username} onChange={checkUsername} required={true} />
                        <p className="text-start" style={{fontSize: 12}} id="usernameCorrector"></p>
                        
                        <input id="password" type="password" size="30" name="password" className="form-control" placeholder="Password" required={true} />
                        
                        <input type="submit" className="btn btn-base float-end mx-3 mt-5 px-4 submit" value="Login" />
                        
                        <button id="changeForm" type="button" className="btn btn-light mt-5 float-end">Sign up instead</button>
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