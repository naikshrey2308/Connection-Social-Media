import { memo, useState, useEffect, useRef } from "react";
import { MdEdit, MdOutlinePeopleOutline } from "react-icons/md";
import { BsExclamationCircleFill, BsCheckCircleFill} from "react-icons/bs"
import { useNavigate } from "react-router";
import "../styles/user-profile.css";
import ShowWholePost from "../Components/showWholePost";
import ShowTextPost from "../Components/showTextPost";
import axios from "axios";


function AboutContent(props) {

    const navigate = useNavigate();

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        (async function () {
            let res = await fetch("/user/getFollowers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email: props.user.email }),
            });

            res = await res.json();
            setFollowers(res.followers);
        })();

        (async function () {
            let res = await fetch("/user/getFollowing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email: props.user.email }),
            });

            res = await res.json();
            setFollowing(res.following);
        })();
    }, [props.trigger]);

    const redirectToProfile = (username) => window.location.href = ("/users/" + username);

    return (
        <div className="row my-5 pt-3 mx-auto gx-0">
            <div style={{ maxHeight: "80vh", overflowY: "scroll" }} className="col-4 mx-auto text-center">
                <h1 className="text-center">{followers.length}</h1>
                <h4 className="text-secondary">Followers</h4>

                <div className="mt-5">
                    {
                        followers.map(ele => {
                            return <div style={{ cursor: "pointer" }} onClick={() => redirectToProfile(ele.username)} className="hover-block py-1 border-bottom border-top py-3 d-flex align-items-center">
                                <img style={{ "borderRadius": "50%" }} src={"/profilePics/" + ele.profilePic} width={30} className="border border-2" />
                                <p className="w-100 my-auto">{ele.username}</p>
                            </div>
                        })
                    }
                </div>
            </div>
            <div style={{ maxHeight: "80vh", overflowY: "scroll" }} className="col-4 mx-auto text-center">
                <h1 className="text-center">{following.length}</h1>
                <h4 className="text-secondary">Following</h4>

                <div className="mt-5">
                    {
                        following.map(ele => {
                            return <div style={{ cursor: "pointer" }} onClick={() => redirectToProfile(ele.username)} className="hover-block py-1 border-bottom border-top py-3 d-flex align-items-center">
                                <img style={{ "borderRadius": "50%" }} src={"/profilePics/" + ele.profilePic} width={30} className="border border-2" />
                                <p className="w-100 my-auto">{ele.username}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

function TextContent(props) {

    const [posts, setPosts] = useState([]);

    const [postForModal,setPostForModal]= useState({});
    const [modalShow , setmodalShow] = useState(false);

    
    function changeComment(newComment,flag){
        if(flag){
            let index = posts.findIndex((val)=>val.id === postForModal.id);
            posts[index].comments.push(newComment);
            postForModal.comments.push(newComment);
            flag = !flag;
        }
    }

    function modalShow_(post){
        // console.log("hello");

        setmodalShow(true);
        setPostForModal(post);
    }

    function textPostClicked(post){
        let obj = {
            id : post._id,
            profilePic : props.user.profilePic ? props.user.profilePic.name : 'default_.png',
            name : props.user.name,
            username : post.username,
            likes : post.likes,
            comments : post.comments,
            type : post.type,
            content : post.content
        }
       modalShow_(obj);
    }

    useEffect(() => {
        (async () => {
            // Load the user data from the server
            let res = await fetch(`/posts/text/${props.user.username}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            res = await res.json();

            setPosts(res);
            
        })();

        
    }, []);


    if (posts.length == 0) {
        return (
            <>
                <div style={{ "transform": "translate(-32.5%, 32.5%)" }} className="position-absolute top-50 start-50">
                    <img width={400} src={process.env.PUBLIC_URL + "/media/svgs/no-images.svg"} />
                    <h3 className="text-center mt-5">No Posts Yet</h3>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container my-3">
                {
                    posts.map((post) => {
                        return (
                            <>
                                <div className="container text-post my-3" style={{cursor:'pointer', maxWidth: "75%"}} onClick={()=>textPostClicked(post)}>
                                    <div className="d-flex border bg-light p-3 shadow w-100">
                                        <img src={"/profilePics/" + (props.user.profilePic ? props.user.profilePic.name : "default_.png")} width={25} height={25} style={{ borderRadius: "50%" }} />
                                        <div className="px-3">{props.user.username}</div>
                                    </div>

                                    <div id={post._id} dangerouslySetInnerHTML={{__html: post.content.text}} className="p-3 shadow bg-white border-start border-end" onClick={textPostClicked} style={{wordWrap:'break-word'}}>
                                    </div>
                                    
                                    <div className="text-start shadow bg-white border py-3 px-2">
                                        <button className="btn btn-white p-0">
                                            <img src={process.env.PUBLIC_URL + "/media/icons/like.svg"} className="mx-3" width={15} />
                                        </button>
                                        <button className="btn btn-white p-0">
                                            <img src={process.env.PUBLIC_URL + "/media/icons/comment.svg"} className="mx-3" width={15} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }
            </div>

            <ShowTextPost show={modalShow} onHide={() => setmodalShow(false)} post={postForModal} changecommentInUI={changeComment}/>

        </>
    );
}

function ImageContent(props) {

    function openModalForPost(post){
        let obj = {
            id : post._id,
            profilePic : props.user.profilePic.name,
            name : props.user.name,
            username : post.username,
            likes : post.likes,
            comments : post.comments,
            type : post.type,
            content : post.content
        }
       modalShow_(obj);
    }

    const [posts, setPosts] = useState([]);

    const [postForModal,setPostForModal]= useState({});
    const [modalShow , setmodalShow] = useState(false);

    
    function changeComment(newComment,flag){
        if(flag){
            let index = posts.findIndex((val)=>val.id === postForModal.id);
            posts[index].comments.push(newComment);
            postForModal.comments.push(newComment);
            flag = !flag;
        }
    }

    function modalShow_(post){
        // console.log("hello");

        setmodalShow(true);
        setPostForModal(post);
    }


    useEffect(() => {

        (async () => {
            // Load the user data from the server
            let res = await fetch(`/posts/images/${props.user.username}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            res = await res.json();
            console.log(res);
            setPosts(res);
        })();
    }, []);

    if (posts.length == 0) {
        return (
            <>
                <div style={{ "transform": "translate(-32.5%, 32.5%)" }} className="position-absolute top-50 start-50">
                    <img width={400} src={process.env.PUBLIC_URL + "/media/svgs/no-images.svg"} />
                    <h3 className="text-center mt-5">No Posts Yet</h3>
                </div>
            </>
        );
    }

    
    return (
        <>
            <div className="container my-3">
                <div className="d-flex justify-content-center w-100 image-flex">
                    {
                        posts.map((post) => {
                            return (
                                <>
                                    <img src={"/posts/" + post.content.url} width={220} height={220} className="m-2 border" style={{cursor:'pointer'}} onClick={() =>{openModalForPost(post)}}/>
                                </>
                            );
                        })
                    }
                </div>
            </div>
            
            <ShowWholePost show={modalShow} onHide={() => setmodalShow(false)} post={postForModal} changecommentInUI={changeComment}/>

        </>
    );
}


function EditProfile(props){

    const profilePicRef = useRef();
    const nameRef = useRef();
    const usernameRef = useRef();
    const bioRef = useRef();
    const profilePicShowRef = useRef();
    const currPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const [username , setUsername ] = useState('');
    const [name , setName ] = useState('');
    const [bio , setBio ] = useState('');

    const [usernameFlag,setUsernameFlag] = useState(true);
    const [submitEnable,setSubmitEnable] = useState(true);
    const [userWindowShow,setUserWindowShow] = useState(true);
    const [changePasswordBtnEnable,setChangePasswordBtnEnable] = useState(false);
    const [currPasswordCorrect,setCurrPasswordCorrect] = useState(false);
    const [confirmPasswodMatched,setConfirmPasswordMatched] = useState(false);

    // console.log(user);

    function profilePicChanged(){
        (async function(){
            profilePicShowRef.current.src =  await URL.createObjectURL(profilePicRef.current.files[0]); 
        })();
    }

    function usernameChanged(){
        setUsername(usernameRef.current.value);
        if(usernameRef.current.value===''){
            setUsernameFlag(false);
            setSubmitEnable(false);
        }
        if(usernameRef.current.value !== window.sessionStorage.getItem('username')){
            (async function(){
                const req = await fetch(`/user/usernameAvailable/${usernameRef.current.value}`,{
                    method : 'GET',
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                const res = await req.json();
                if(res.flag === true){
                    setUsernameFlag(true);
                }
                else{
                    setUsernameFlag(false);
                    setSubmitEnable(false);
                }
            })();
        }
        else {
            setUsernameFlag(true);
        }
    }

    function formSubmitted(){

        (async function(){
            const picData = new FormData();
            picData.append("username", usernameRef.current.value);
            picData.append("profilePic", profilePicRef.current.files[0], profilePicRef.current.files[0].name);
            const res = await axios.post("/user/register/profilePic", picData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        })();
        

        var objUpdate = {
            name : nameRef.current.value,
            username : usernameRef.current.value,
            bio : bioRef.current.value,
            profilePic : {
                name : profilePicRef.current.file[0].name
            }
        }

        (async function(){
            const req = await fetch('/user/updateUser',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body : JSON.stringify({
                    email : window.sessionStorage.getItem('email'),
                    user : objUpdate
                })
            })
            if(req.json().status){
                window.sessionStorage.setItem('username',objUpdate.username);
                window.sessionStorage.setItem('name',objUpdate.name);
                window.sessionStorage.setItem('profilePic',profilePicRef.current.file[0].name);

            }
        })();
    }

    function changePasswordWindow(){
        setUserWindowShow(false);
    }

    function changeUserWindow(){
        setUserWindowShow(true);
    }

    function changePassword(){
        (async function(){
            const req = await fetch('/user/changePassword',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body : JSON.stringify({
                    email : window.sessionStorage.getItem('email'),
                    password : newPasswordRef.current.value
                })
            })
            const res = req.json();
            if(res.status===true){
                setUserWindowShow(true);
                window.sessionStorage.setItem('password',newPasswordRef.current.value);
            }
        })();
    }

    function currPasswordChanged(){
        if(currPasswordRef.current.value === window.sessionStorage.getItem('password')){
            setCurrPasswordCorrect(true);
            if(confirmPasswodMatched===true){
                setChangePasswordBtnEnable(true);
            }
        }
        else{
            setCurrPasswordCorrect(false);
            setChangePasswordBtnEnable(false);
        }
    }

    function confirmPasswordChanged(){
        if(confirmPasswordRef.current.value === newPasswordRef.current.value){
            setConfirmPasswordMatched(true);
            if(currPasswordCorrect===true){
                setChangePasswordBtnEnable(true);
            }
        }
        else{
            setConfirmPasswordMatched(false);
            setChangePasswordBtnEnable(false);
        }

    }

    var temp=props.user.profilePic.name;
    useEffect(()=>{
        setUserWindowShow(true);
        setChangePasswordBtnEnable(false);
        setConfirmPasswordMatched(false);
        setCurrPasswordCorrect(false);
        setUsernameFlag(true);
        temp = props.user.profilePic ? props.user.profilePic.name : "default_.png";
        (async function(){
            const req = await fetch(`/user/getUser/${window.sessionStorage.getItem('username')}`,{
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const res = await req.json();
            setUsername(res.user.username);
            setName(res.user.name);
            setBio(res.user.bio);
            // user.profilePic = temp ;

        })();
    },[])

    return(
        <>
            { userWindowShow && <div className="mx-5 my-4">
                    <img ref={profilePicShowRef} src={`http://localhost:4000/static/profilePics/${temp}`} width={120} height={120} className="profile-image d-block mx-auto my-2" />
                    <center><input ref={profilePicRef} type="file" onChange={profilePicChanged} name="profile_pic" id="profile_pic" accept="image/*" className="input input-control form-control my-1" /></center>
                    <div className="row my-5">
                        <div className="col-2 my-2">
                            <b>Name : </b>
                        </div>
                        <div className="col-5">
                            <input ref={nameRef} type="text" name="name" id="name" value={name} className=" input-control form-control" />
                        </div>
                    </div> 

                    <div className="row my-5">
                        <div className="col-2 my-2">
                            <b>Username : </b>
                        </div>
                        <div className="col-5 d-flex">
                            <input ref={usernameRef} type="text" name="usename" id="username" value={username} className=" input-control form-control" onChange={usernameChanged}/>
                            { (usernameFlag ) &&
                                <BsCheckCircleFill color='green' size={30} className="mx-2 my-1"/>
                            }
                            { (!usernameFlag ) &&
                                <BsExclamationCircleFill color='red' size={30} className="mx-2 my-1"/>
                            }
                        </div>
                    </div>    

                    <div className="row my-5">
                        <div className="col-2 my-2">
                            <b>Bio : </b>
                        </div>
                        <div className="col-5">
                            <input ref={bioRef} type="text" name="bio" id="bio" value={bio} className=" input-control form-control" onChange={usernameChanged}/>
                        </div>
                    </div>  

                    <center><div className="row my-5">
                        <div className="col-11 mx-5" >
                            <button className="btn btn-base" onClick={formSubmitted} disabled={!submitEnable}>Update</button>
                                            
                            <button onClick={changePasswordWindow} className="btn btn-danger mx-5">Change Password</button> 
                        </div>
                    </div> </center>
            </div>}

            {!userWindowShow && <div className="my-5">
            
                <center><div style={{width:40+'%'}}>
                    <div className="d-flex">
                        <input ref={currPasswordRef} onChange={currPasswordChanged} type="password" name="bio" placeholder = 'Enter Current Password' className="my-2 input-control form-control" />
                        { (currPasswordCorrect ) &&
                            <BsCheckCircleFill color='green' size={30} className="mx-2 my-3"/>
                        }
                        { (!currPasswordCorrect ) &&
                            <BsExclamationCircleFill color='red' size={30} className="mx-2 my-3"/>
                        }
                    </div>
                    
                    <div className="d-flex">
                        <input ref={newPasswordRef} type="password" name="bio" placeholder = 'Enter New Password' className="my-4 input-control form-control" />
                        <BsExclamationCircleFill color='white' size={30} className="mx-2 my-3"/>
                    </div>
                                    
                    <div className="d-flex">
                        <input ref={confirmPasswordRef} onChange={confirmPasswordChanged} type="password" name="bio" placeholder = 'Enter Confirm Password' className="my-2 input-control form-control" />
                        { (confirmPasswodMatched ) &&
                            <BsCheckCircleFill color='green' size={30} className="mx-2 my-3"/>
                        }
                        { (!confirmPasswodMatched ) &&
                            <BsExclamationCircleFill color='red' size={30} className="mx-2 my-3"/>
                        }
                    </div>
                </div></center>

                <center><div className="row my-5">
                        <div className="col-11 mx-5" >
                            <button className="btn btn-base " onClick={changeUserWindow} disabled={!submitEnable} >Update Profile</button>
                                            
                            <button onClick={changePassword} className="btn btn-danger mx-5" disabled={!changePasswordBtnEnable}>Change Password</button> 
                        </div>
                    </div> </center>

            </div>}
        </>
    );
}

function UserAdditionalContent(props) {

    const [editActive, setEditActive] = useState(false);
    const [aboutActive, setAboutActive] = useState(true);
    const [textActive, setTextActive] = useState(false);
    const [imageActive, setImageActive] = useState(false);

    const makeAboutActive = () => {
        setAboutActive(true);
        setTextActive(false);
        setImageActive(false);
        setEditActive(false);
        props.setEditMode(false);
    }

    const makeImageActive = () => {
        setAboutActive(false);
        setTextActive(false);
        setImageActive(true);
        setEditActive(false);
        props.setEditMode(false);
    }

    const makeTextActive = () => {
        setAboutActive(false);
        setTextActive(true);
        setImageActive(false);
        setEditActive(false);
        props.setEditMode(false);
    }

    const makeEditActive = () => {
        setAboutActive(false);
        setTextActive(false);
        setImageActive(false);
        setEditActive(true);
        props.setEditMode(true);
    }

    useEffect(() => {
        const url = "https://st.depositphotos.com/1000423/2111/i/600/depositphotos_21114749-stock-photo-two-football-players-striking-the.jpg";
        if (props.editMode == true)
            makeEditActive();
    }, [props.editMode]);

    

    return (
        <div className="position-relative">
            <div className="set-nav-align d-flex justify-content-evenly border-bottom border-3 w-100">
                {(props.isMe) &&
                    <div className={(editActive ? "active-tab" : "") + " post-type-icon d-flex align-items-center py-2"} onClick={makeEditActive}>
                        <MdEdit color="black" className="mx-2" size={25}></MdEdit>
                    </div>
                }
                <div className={(aboutActive ? "active-tab" : "") + " d-flex align-items-center post-type-icon my-0 py-2"} onClick={makeAboutActive}>
                    <MdOutlinePeopleOutline color="black" size={30}></MdOutlinePeopleOutline>
                </div>
                <div className={(imageActive ? "active-tab" : "") + " post-type-icon my-0 py-2"} onClick={makeImageActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/image-post.svg"} width={35} height={35} />
                </div>
                <div className={(textActive ? "active-tab" : "") + " post-type-icon my-0 py-2"} onClick={makeTextActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/text-post.svg"} width={35} height={35} />
                </div>
            </div>

            {editActive && <EditProfile trigger={props.trigger} user = {props.user}/>}    
            {aboutActive && <AboutContent trigger={props.trigger} user={props.user} />}
            {imageActive && <ImageContent user={props.user}/>}
            {textActive && <TextContent user={props.user} />}


        </div>
    );
}

export default memo(UserAdditionalContent);