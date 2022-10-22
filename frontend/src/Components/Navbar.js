import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef,useState } from "react";
import "../styles/navbar.css";
// import { post } from "../../../backend/routes/userRoutes";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Navbar(props) {

    const [Home, Chat, Post, Discover, Profile] = [useRef(), useRef(), useRef(), useRef(), useRef()];

    // Mapping of icon variables with icon names
    Home.name = "home";
    Chat.name = "chat";
    Post.name = "add";
    Discover.name = "group-add";
    Profile.name = "account";

    const activateIcon = (icon) => {
        icon.current.src = `${process.env.PUBLIC_URL}/media/icons/${icon.name}.svg`;
    }

    const blurIcon = (icon) => {
        icon.current.src = `${process.env.PUBLIC_URL}/media/icons/${icon.name}_hollow.svg`;
    }

    //for modal show and hide purpose
    const [showPost, setShowPost] = useState(false);
    const closePostPage = () => setShowPost(false);
    const showPostPage = () => setShowPost(true);

    // make whole post object
    const [post,setPost] = useEffect({});

    //handle the data get from modal form
    
    const showPostRef = useRef();
    const picRef = useRef();
    const captionRef = useRef();
    const locationRef = useRef();

    // post.picture = picRef;

    const onLocation = () =>{

    }
    
    const onPostPic = async() => {
        showPostRef.current.src = await URL.createObjectURL(picRef.current.files[0]);
        setPost({...post, postPic: showPostRef.current.src});
        
    };
    const onCaption = ()=>{

    }

    const handleSubmit = ()=>{

    }

    

    return (
        <>
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
                                <Link onMouseEnter={() => activateIcon(Home)} onMouseLeave={() => blurIcon(Home)} className="nav-link active ml-3" aria-current="page" to="/home"><img ref={Home} src= {process.env.PUBLIC_URL + "/media/icons/home_hollow.svg" } className="nav_img" /></Link>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(Chat)} onMouseLeave={() => blurIcon(Chat)} className="nav-link" to="/chat"><img ref={Chat} src= {process.env.PUBLIC_URL + "/media/icons/chat_hollow.svg"} className="nav_img" /></Link>
                            </li>
                            <li className="nav-item">
                                <img ref={Post} src= {process.env.PUBLIC_URL + "/media/icons/add_hollow.svg"} className="nav_img " onMouseEnter={() => activateIcon(Post)} onMouseLeave={() => blurIcon(Post)} onClick={showPostPage}/>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(Discover)} onMouseLeave={() => blurIcon(Discover)} className="nav-link" to="/discover"><img ref={Discover} src= {process.env.PUBLIC_URL + "/media/icons/group-add_hollow.svg"} className="nav_img"/></Link>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(Profile)} onMouseLeave={() => blurIcon(Profile)} className="nav-link float-end" to="/user/"><img ref={Profile} src= {process.env.PUBLIC_URL + "/media/icons/account_hollow.svg"} className="nav_img"/></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Modal show={showPost} onHide={closePostPage}>
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
                
            </Modal>
        </>
    );

}

export default memo(Navbar);