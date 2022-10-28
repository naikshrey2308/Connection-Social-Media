import { memo, useState, useEffect } from "react";
import { MdEdit, MdOutlinePeopleOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import "../styles/user-profile.css";
import ShowWholePost from "../Components/showWholePost";
import ShowTextPost from "../Components/showTextPost";

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
    }, []);

    const redirectToProfile = (username) => window.location.href = ("/users/" + username);

    return (
        <div className="row my-5 pt-3 mx-auto gx-0">
            <div style={{ maxHeight: "80vh", overflowY: "scroll" }} className="col-4 mx-auto text-center">
                <h1 className="text-center">{props.user.followers.length}</h1>
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
                <h1 className="text-center">{props.user.following.length}</h1>
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

        posts.forEach((post) => {
            document.getElementById(post._id).innerHTML = post.content.text;
        });
        
    }, [posts]);


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
                                <div className="container text-post border my-3 border-1 p-3" style={{cursor:'pointer'}} onClick={()=>textPostClicked(post)}>
                                    <div className="d-flex w-100">
                                        <img src="https://st.depositphotos.com/1000423/2111/i/600/depositphotos_21114749-stock-photo-two-football-players-striking-the.jpg" width={25} height={25} style={{ borderRadius: "50%" }} />
                                        <div className="px-3">{props.user.username}</div>
                                        <div className="text-end w-100">
                                            <button className="btn btn-light p-0">
                                                <img src={process.env.PUBLIC_URL + "/media/icons/expand.svg"} className="mx-3" width={15} />
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div id={post._id} onClick={textPostClicked} style={{wordWrap:'break-word'}}>

                                    </div>
                                    <hr />
                                        <div className="text-start">
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

            {aboutActive && <AboutContent user={props.user} />}
            {imageActive && <ImageContent user={props.user}/>}
            {textActive && <TextContent user={props.user} />}


        </div>
    );
}

export default memo(UserAdditionalContent);