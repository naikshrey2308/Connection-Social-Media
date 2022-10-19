import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { MdAdd, MdChat, MdComment, MdHome, MdOutlineChatBubble, MdOutlineChatBubbleOutline, MdOutlineHome, MdOutlinePersonAdd, MdPersonAdd } from "react-icons/md";
import { IoCompass, IoCompassOutline, IoPersonCircle, IoPersonCircleOutline, IoPersonCircleSharp } from "react-icons/io5";
import "../styles/navbar.css";

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
        </>
    );

}

export default memo(Navbar);