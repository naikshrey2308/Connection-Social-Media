import { memo, useCallback, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef,useState } from "react";
import { MdAdd, MdChat, MdComment, MdHome, MdOutlineChatBubble, MdOutlineChatBubbleOutline, MdOutlineHome, MdOutlinePersonAdd, MdPersonAdd, MdSearch } from "react-icons/md";
import { IoCompass, IoCompassOutline, IoPersonCircle, IoPersonCircleOutline, IoPersonCircleSharp } from "react-icons/io5";

import "../styles/navbar.css";
// import { post } from "../../../backend/routes/userRoutes";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

function Navbar(props) {

    const [Home, setHome] = useState(false);
    const [Chat, setChat] = useState(false);
    const [Post, setPost] = useState(false);
    const [Discover, setDiscover] = useState(false);
    const [Profile, setProfile] = useState(false);
    const [searchedText , setSearchedText] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const searchRef = useRef();

    var navigate= useNavigate();

    let location = useLocation();

    const activate = useCallback((callback) => {
        setHome(false);
        setChat(false);
        setPost(false);
        setDiscover(false);
        setProfile(false);
        
        callback(true);
    }, []);

    useEffect(() => {
        if(location.pathname.includes("home"))
            activate(setHome);
        else if(location.pathname.includes("chat"))
            activate(setChat);
        else if(location.pathname.includes("post"))
            activate(setPost);
        else if(location.pathname.includes("discover"))
            activate(setDiscover);
        else if(location.pathname.includes("users"))
            activate(setProfile);
    }, [location]);

    function searchTextChanged(){
        setSearchedText(searchRef.current.value);
        console.log(searchRef.current.value);
        (async function(){
            const req = await fetch(`/user/searchedUser/${searchRef.current.value}`,{
                method : 'GET',
                header : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'   
                },
            });
            const res =await req.json();
            console.log(res);
            setSearchResult(res.result);
        })();
    }   

    function searchedUserSelected(user){
        navigate(`/users/${user.username}`);
    }

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
                        <form className="d-flex align-items-center bg-white border border-2 mx-auto" role="search">
                            <input className="form-control border-0 searchbox me-0" ref={searchRef} onChange={searchTextChanged} type="search" placeholder="Search" aria-label="Search"/>
                            <MdSearch size={25} color="var(--primary)" className="me-2" />
                        </form>

                        <ul className="navbar-nav mx-auto me-0 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active ml-3" aria-current="page" to="/home">
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
                                <Link className="nav-link" to="/chat">
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

                                <Link className="nav-link" to="/post">
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
                                <Link className="nav-link" to="/discover">
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
                                <Link className="nav-link float-end" to="/users/">
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

        { (searchedText) && 
            <div className="position-absolute shadow border border-primary searchResult">
                {/* <h1>hello</h1> */}
                { searchResult && searchResult.map( (value) => 
                    <div className="row align-items-center my-2 searchrow" style={{cursor:'pointer'}} onClick={ () => {searchedUserSelected(value)} }>
                        <div className = "col-4 my-1">
                            <img alt="" src={`http://localhost:4000/static/profilePics/${value.profilePic}`} className="mx-4 border" width={30} height={30} style={{borderRadius: "50%"}} />
                        </div>
                        <div className = "col-8 my-1">
                            <p className="my-0">{value.name}</p>
                            <p className="text-secondary my-0">{value.username}</p>
                        </div>
                    </div>
                )}
            </div>
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