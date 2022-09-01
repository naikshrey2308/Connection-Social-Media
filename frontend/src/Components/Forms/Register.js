import { memo, useEffect, useState, useContext } from "react";
import "../../styles/login.css";
import validate from "../Reusables/Validator";
import LoginContext from "../../Contexts/loginContext";

function Form(props) {
    let [curr, setCurr] = useState(1);

    const [user, setUser] = useState({});

    const { isLoginFormEnabled, setIsLoginFormEnabled } = useContext(LoginContext);

    const changeForm = () => {
        setIsLoginFormEnabled(true);
    }

    const checkName = () => {
        validate("name", /^[a-zA-Z ]+$/, "nameCorrector", "&cross; Invalid name", true);
        setUser({...user, name: document.getElementById("name").value});
    };

    const checkEmail = () => {
        validate("email", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "emailCorrector", "&cross; Invalid Email", true);
        setUser({...user, email: document.getElementById("email").value});
    };

    const checkUsername = () => {
        validate("username", /^[a-zA-Z0-9_.]+$/, "usernameCorrector", "&cross; Username can only contain alphabets, numbers, underscore and period", true);
        setUser({...user, username: document.getElementById("username").value});
    };

    const setPassword = () => {
        validate("password", /^.{6,50}$/, "passwordCorrector", "&cross; Password should be atleast 6 characters long", true);
        setUser({...user, password: document.getElementById("password").value});
    };

    const checkDOB = () => {
        setUser({...user, birthdate: document.getElementById("birthdate").value});
    };

    const checkMob = () => {
        validate("mobile_number", /^[0-9]{10}$/, "mobileNumberCorrector", "Mobile number should contain exact 10 digits", true);
        setUser({...user, mobile: document.getElementById("mobile_number").value});
        console.log(user.mobile);
    };

    const setLocation = () => {
        setUser({...user, location: document.getElementById("location").value});
    };

    const setBio = () => {
        setUser({...user, bio: document.getElementById("bio").value});
    };

    const setProfilePic = () => {
        setUser({...user, profilePic: document.getElementById("profile_pic").value});
    };

    function nextPage() {
        if(curr == 6) return;
        setCurr(++curr);
    }

    function prevPage() {
        if(curr == 0) return;
        setCurr(--curr);
    }

    useEffect(() => {

    }, []);

    return (
        <>
        <div className="main bg-light row g-0">
            <div className="col-12 mx-auto pb-5 px-3 col-lg-5 col-md-6 col-sm-8 right-form">
                <div className="form form-control mx-auto text-center border-0 mt-5">
                <div className="logo text-center mb-0 text-base">Connection</div>

                    <form method="POST" action="" className="mx-xl-5 px-lg-5" autocomplete="off">

                        {(curr == 1) && <>
                            <input id="name" spellCheck="false" type="text" size="30" name="name" className="form-control" placeholder="Enter your Name" value={user.name} onChange={checkName} />
                            <p className="text-start" style={{fontSize: 12}} id="nameCorrector"></p>
                            
                            <input id="email" spellCheck="false" type="email" size="30" name="email" className="form-control" placeholder="Enter your Email" value={user.email} onChange={checkEmail} />
                            <p className="text-start" style={{fontSize: 12}} id="emailCorrector"></p>
                            
                            <input id="username" spellCheck="false" type="text" size="30" name="username" className="form-control" placeholder="Choose your Username" value={user.username} onChange={checkUsername} /> 
                            <p className="text-start" style={{fontSize: 12}} id="usernameCorrector"></p>                       
                            
                            <input id="password" type="password" size="30" name="password" className="form-control" placeholder="Set Password" value={user.password} onChange={setPassword} />
                            <p className="text-start" style={{fontSize: 12}} id="passwordCorrector"></p>
                            
                            <input id="confirm_password" type="password" size="30" name="confirm_password" className="form-control" placeholder="Re-enter Password" />
                        </>}

                        {(curr == 2) && <>
                            <h6>We require your birthdate to make your day special</h6>
                            <img src= {process.env.PUBLIC_URL + "/media/svgs/birthday.svg"} className="w-50 mx-auto mt-3 mb-5" />
                            <input type="date" name="birthdate" id="birthdate" className="input-control form-control my-3" value={user.birthdate} onChange={checkDOB} />
                        </>}
                        
                        {(curr == 3) && <>
                            <h6>Your mobile number helps us verify your profile. This won't be displayed in your profile.</h6>
                            <img src= {process.env.PUBLIC_URL + "/media/svgs/mobile.svg"} className="w-50 mx-auto mt-3 mb-5" />
                            <input type="text" value={user.mobile} onChange={checkMob} name="mobile_number" id="mobile_number" className="input-control form-control" placeholder="+91 12345 67890" />
                            <p className="text-start" style={{fontSize: 12}} id="mobileNumberCorrector"></p>
                        </>}

                        {(curr == 4) && <>
                            <h6>Your location helps us find friends near your area</h6>
                            <img src= {process.env.PUBLIC_URL + "/media/svgs/world-location.svg"} className="w-50 mx-auto mt-3 mb-5" />
                            <input type="text" value={user.location} onChange={setLocation} name="location" id="location" className="input-control form-control" placeholder="e.g. Mumbai, India" />
                        </>}

                        {(curr == 5) && <>
                            <h6>A picture to impress the community. Add a profile photo.</h6>
                            <img src={process.env.PUBLIC_URL + "/media/svgs/profile.svg"} className="w-50 mx-auto mt-3 mb-5 p-3" style={{borderRadius: "50%"}} />
                            <input type="file" onChange={setProfilePic} name="profile_pic" id="profile_pic" className="input-control form-control" />
                        </>}

                        {(curr == 6) && <>
                            <h6>Ahhhh! Finally. We're just there. Finish setting up your profile with a great bio.</h6>
                            <textarea id="bio" value={user.bio} onChange={setBio} name="bio" className="d-none"></textarea>
                            <div contentEditable="true" id="bio-para" className="border p-3"></div>
                        </>}

                        <input type="button" className="btn btn-base btn-light float-end mr-3 mt-5 px-4 submit" value={(curr == 6) ? "Register" : "Next >"} onClick={nextPage} />
                        
                        {(curr > 1) && <><input type="button" className="btn btn-secondary border btn-light float-end mx-1 mt-5 px-4 submit border" value="< Prev" onClick={prevPage} /></>}

                        <button onClick={changeForm} id="changeForm" type="button" className="btn text-primary mt-5 float-start border-0">Log in instead</button>
                    </form>
                
                </div>
            </div>
        </div>
        </>
    );
}

function Register(props) {
    return (
        <div id="register-block">
            <Form />
        </div>
    );
}

export default memo(Register);