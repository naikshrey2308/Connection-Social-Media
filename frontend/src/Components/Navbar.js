import { memo } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import "../styles/navbar.css";

function Navbar() {

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

    return (
        <>
            <nav className="navbar navbar-expand-lg border-bottom fixed-top bg-light">
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
                                <Link onMouseEnter={() => activateIcon(Post)} onMouseLeave={() => blurIcon(Post)} className="nav-link" to="/create"><img ref={Post} src= {process.env.PUBLIC_URL + "/media/icons/add_hollow.svg"} className="nav_img"/></Link>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(Discover)} onMouseLeave={() => blurIcon(Discover)} className="nav-link" to="/discover"><img ref={Discover} src= {process.env.PUBLIC_URL + "/media/icons/group-add_hollow.svg"} className="nav_img"/></Link>
                            </li>
                            <li className="nav-item">
                                <Link onMouseEnter={() => activateIcon(Profile)} onMouseLeave={() => blurIcon(Profile)} className="nav-link float-end" to="/userProfile"><img ref={Profile} src= {process.env.PUBLIC_URL + "/media/icons/account_hollow.svg"} className="nav_img"/></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );

}

export default memo(Navbar);