import { memo, useState, useEffect } from "react";
import "../styles/user-profile.css";

function AboutContent(props) {
    return (
        <>
            <div className="container">
                { props.user.location &&
                    <p>📍 Lives in {props.user.location.city}, {props.user.location.state}, {props.user.location.country}</p>
                }
            </div>
        </>
    );
}

function TextContent(props) {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            // Load the user data from the server
            let res = await fetch(`/posts/text/${encodeURIComponent(window.sessionStorage.getItem("username"))}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            res = await res.json();

            setPosts(res);
        })();

        posts.forEach((post) => {
            document.getElementById(post._id).innerHTML = post.content.text;
        });
    }, [posts]);

    return (
        <>
            <div className="container my-3">
                {
                    posts.map((post) => {
                        return (
                            <>
                                <div className="container text-post border my-3 border-1 p-3">
                                    <div className="d-flex w-100">
                                        <img src="https://st.depositphotos.com/1000423/2111/i/600/depositphotos_21114749-stock-photo-two-football-players-striking-the.jpg" width={25} height={25} style={{borderRadius: "50%"}} />
                                        <div className="px-3">{props.user.username}</div>
                                        <div className="text-end w-100">
                                            <button className="btn btn-light p-0">
                                                <img src={process.env.PUBLIC_URL + "/media/icons/expand.svg"} className="mx-3" width={15} />
                                            </button>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div id={post._id}>

                                    </div>
                                    <hr/>
                                    <div className="d-flex w-100">
                                        <div className="text-start">
                                            <button className="btn btn-white p-0">
                                                <img src={process.env.PUBLIC_URL + "/media/icons/like.svg"} className="mx-3" width={15} />
                                            </button>
                                            <button className="btn btn-white p-0">
                                                <img src={process.env.PUBLIC_URL + "/media/icons/comment.svg"} className="mx-3" width={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }
            </div>
        </>
    );
}

function ImageContent(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        (async () => {
            // Load the user data from the server
            let res = await fetch(`/posts/images/${encodeURIComponent(window.sessionStorage.getItem("username"))}`, {
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

    return (
        <>
            <div className="container my-3">
                <div className="d-flex justify-content-center w-100 image-flex">
                {
                    posts.map((post) => {
                        return (
                            <>
                                <img src={"/posts/" + post.content.url} width={220} height={220} className="m-2 border" />
                            </>
                        );
                    })
                }
                </div>
            </div>
        </>
    );
}

function UserAdditionalContent(props) {

    const [aboutActive, setAboutActive] = useState(true);
    const [textActive, setTextActive] = useState(false);
    const [imageActive, setImageActive] = useState(false);

    const makeAboutActive = () => {
        setAboutActive(true);
        setTextActive(false);
        setImageActive(false);
    }

    const makeImageActive = () => {
        setAboutActive(false);
        setTextActive(false);
        setImageActive(true);
    }

    const makeTextActive = () => {
        setAboutActive(false);
        setTextActive(true);
        setImageActive(false);
    }

    useEffect(() => {
        const url = "https://st.depositphotos.com/1000423/2111/i/600/depositphotos_21114749-stock-photo-two-football-players-striking-the.jpg";

    }, []);

    return (
        <>
            <div className="set-nav-align d-flex justify-content-evenly border-bottom border-3 w-100">
                <div className={(aboutActive ? "active-tab" : "") + " post-type-icon my-0 py-2"} onClick={makeAboutActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/about-section.svg"} width={35} height={35} />
                </div>
                <div className={(imageActive ? "active-tab" : "") + " post-type-icon my-0 py-2"} onClick={makeImageActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/image-post.svg"} width={35} height={35} />
                </div>
                <div className={(textActive ? "active-tab" : "") + " post-type-icon my-0 py-2"} onClick={makeTextActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/text-post.svg"} width={35} height={35} />
                </div>
            </div>

            { aboutActive && <AboutContent user={props.user} /> } 
            { imageActive && <ImageContent user={props.user} /> } 
            { textActive && <TextContent user={props.user} /> } 
        </>
    );
}

export default memo(UserAdditionalContent);