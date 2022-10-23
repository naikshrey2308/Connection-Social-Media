import { memo, useCallback, useEffect} from "react";
import { Link } from "react-router-dom";
import { useRef,useState } from "react";
import { MdAdd, MdChat, MdComment, MdHome, MdOutlineChatBubble, MdOutlineChatBubbleOutline, MdOutlineHome, MdOutlinePersonAdd, MdPersonAdd } from "react-icons/md";
import { IoCompass, IoCompassOutline, IoPersonCircle, IoPersonCircleOutline, IoPersonCircleSharp } from "react-icons/io5";

import "../styles/navbar.css";
// import { post } from "../../../backend/routes/userRoutes";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Navbar(props) {

    const [Home, setHome] = useState(false);
    const [Chat, setChat] = useState(false);
    const [Post, setPost] = useState(false);
    const [Discover, setDiscover] = useState(false);
    const [Profile, setProfile] = useState(false);

    const activateIcon = useCallback((callback) => {
        // callback(true);
    }, []);

    const blurIcon = useCallback((callback) => {
        // callback(false);
    }, []);

    const activate = useCallback((callback) => {
        setHome(false);
        setChat(false);
        setPost(false);
        setDiscover(false);
        setProfile(false);
        
        callback(true);
    }, []);

    useEffect(() => {

    }, []);

    //for modal show and hide purpose
    // const [showPost, setShowPost] = useState(false);
    // const closePostPage = () => setShowPost(false);
    // const showPostPage = () => setShowPost(true);

    
    // const showPostRef = useRef();
    // const picRef = useRef();
    // const captionRef = useRef();
    // const locationRef = useRef();

    // // post.picture = picRef;

    // const onLocation = () =>{

    // }
    
    // const onPostPic = async() => {
    //     showPostRef.current.src = await URL.createObjectURL(picRef.current.files[0]);
    //     setPost({...post, postPic: showPostRef.current.src});
        
    // };
    // const onCaption = ()=>{

    // }

    // const handleSubmit = ()=>{

    // }

    

    return (
        <>
        {
            <nav className={"navbar navbar-expand-lg fixed-top border-bottom border-2 bg-light"}>
                <div className="container-fluid">
                    <a className="navbar-brand logonav" href="#">Connection</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex mx-auto" role="search">
                            <input className="form-control me-0 searchbox" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn border-1 btn-light search" type="submit"><img src={process.env.PUBLIC_URL + "/media/icons/search.svg"} className="p-1 nav_img"></img></button>
                        </form>

                        <ul className="navbar-nav mx-auto me-0 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(setHome)} onMouseLeave={() => blurIcon(setHome)} onClick={() => activate(setHome)} className="nav-link active ml-3" aria-current="page" to="/home">
                                    {
                                        (!Home) &&
                                        <MdOutlineHome color="black" size={25}></MdOutlineHome>
                                    }
                                    {
                                        (Home) &&
                                        <MdHome color="var(--primary)" size={25}></MdHome>
                                    }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(setChat)} onMouseLeave={() => blurIcon(setChat)} onClick={() => activate(setChat)} className="nav-link" to="/chat">
                                {
                                    (!Chat) &&
                                    <MdOutlineChatBubbleOutline color="black" size={20}></MdOutlineChatBubbleOutline>
                                }
                                {
                                    (Chat) &&
                                    <MdOutlineChatBubble color="var(--primary)" size={20}></MdOutlineChatBubble>
                                }
                                </Link>
                            </li>
                            <li className="nav-item">

                                <Link onMouseEnter={() => activateIcon(setPost)} onMouseLeave={() => blurIcon(setPost)} onClick={() => activate(setPost)} className="nav-link" to="/post">
                                {
                                    (!Post) &&
                                    <MdAdd color="black" size={25}></MdAdd>
                                }
                                {
                                    (Post) &&
                                    <MdAdd color="var(--primary)" size={25}></MdAdd>
                                } 
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(setDiscover)} onMouseLeave={() => blurIcon(setDiscover)} onClick={() => activate(setDiscover)} className="nav-link" to="/discover">
                                {
                                    (!Discover) &&
                                    <IoCompassOutline color="black" size={25}></IoCompassOutline>
                                }
                                {
                                    (Discover) &&
                                    <IoCompass color="var(--primary)" size={25}></IoCompass>
                                }
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(setProfile)} onMouseLeave={() => blurIcon(setProfile)} onClick={() => activate(setProfile)} className="nav-link float-end" to="/user/">
                                {
                                    (!Profile) &&
                                    <IoPersonCircleOutline color="black" size={25}></IoPersonCircleOutline>
                                }
                                {
                                    (Profile) &&
                                    <IoPersonCircle color="var(--primary)" size={25}></IoPersonCircle>
                                }
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            
        }
        </>
    );

}

export default memo(Navbar);

{/* <Modal show={showPost} onHide={closePostPage}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="POST" encType="multipart/form-data" action="" className="mx-xl-5 px-lg-5" autocomplete="off">
                        <h6>Add Location :</h6>
                        <input ref={locationRef} type="text" onChange={onLocation} name="location" id="location" className="input-control form-control" placeholder="Location" />
                        
                        <h6>Choose Picture : </h6>
                        <img ref={showPostRef} src={(post.picture === undefined) ? process.env.PUBLIC_URL + "/media/svgs/nopost.png" : post.picture} width={400} height={150} className="w-50 mx-auto mt-3 mb-5 p-3" style={{borderRadius: "5%"}} />
                        <input ref={picRef} type="file" onChange={onPostPic} name="postPic" id="postPic" accept="image/posts/*" className="input-control form-control" />
                       
                        <h6>Add Caption :</h6>
                        <input ref={captionRef} type="text" onChange={onCaption} name="caption" id="caption" className="input-control form-control" placeholder="Put Your Thoughts" />
                        
                        <input type="button" className="btn btn-base btn-light float-end mr-3 mt-5 px-4 submit" value="Post" onClick={handleSubmit} />
                    </form>
                </Modal.Body>
                
            </Modal> */}