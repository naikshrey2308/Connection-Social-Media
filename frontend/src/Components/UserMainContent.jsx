import { memo, useEffect, useRef, useState } from "react";
import { MdCheck, MdEdit, MdLocationPin, MdLogout, MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import "../styles/user-profile.css";

function UserMainContent(props) {

    const followBtn = useRef();

    const navigate = useNavigate();

    const [isFollowing, setIsFollowing] = useState(props.me.following.includes(props.user.email));

    const [posts, setPosts] = useState(0);

    const [followers, setFollowers] = useState(props.user.followers.length);
    const [following, setFollowing] = useState(props.user.following.length);

    const follow = async () => {
        if(props.isMe || props.user == window.sessionStorage.getItem("username"))
            return;

        followBtn.current.innerHTML = "<span class='spinner-border text-base spinner-border-sm'></span>";
        followBtn.current.disabled = true;
        followBtn.current.style.opacity = 0.5;
        
        const req = await fetch("/user/follow", {
            method: "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                email: props.user.email,
                email_session: window.sessionStorage.getItem('email')
            })
        });

        const res = await req.json();
        console.log(res);
        if(res.status != "true")
            return;
        setIsFollowing(true);

        props.setTrigger(!props.trigger);
        setFollowers(followers + 1);
        // followBtn.current.style.opacity = 1;
        // followBtn.current.innerHTML = "<span class='text-base'>Unfollow</span>";        
    }

    const unfollowClicked = async () => {
        if(props.isMe || props.user == window.sessionStorage.getItem("username"))
            return;

        const userEmail = window.sessionStorage.getItem('email');
        const personEmail = props.user.email;
        console.log("q");

        const req = await fetch('/user/unfollow',{
            method : 'POST',
            headers :  {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body : JSON.stringify({
                user : userEmail,
                person : personEmail
            })
        });
        
        console.log("ansdjnaslkdnaklsdnas");

        const res = await req.json();       
        setFollowers(followers - 1); 

        props.setTrigger(!props.trigger);
        setIsFollowing(false);
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

            // Load the user data from the server
            let res2 = await fetch(`/posts/images/${props.user.username}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            res2 = await res2.json();

            setPosts(res.length + res2.length);
        })();
    }, [isFollowing]);

    const logout = () => {
        window.sessionStorage.clear();
        window.location.href = '/';
    }

    return (
            <div className="set-nav-align position-fixed col-lg-4 col-12 text-center bg-base py-3" style={{height: "100vh"}}>
                
                    { (props.isMe) && 
                        <div style={{cursor: "pointer"}} className="position-absolute top-0 end-0 m-3">
                        <MdOutlineLogout onClick={logout} size={25} color="white" />
                        </div>
                    }

                    {/* Basic information section */}
                    <img style={{objectFit: "cover"}} src={ "/profilePics/" + ((props.user.profilePic) ? (props.user.profilePic.name) : "default_.png") } width={200} height={200} className="profile-image d-block mx-auto" />
                    <h4 className="text-light mt-4 mb-2">@{props.user.username}</h4>
                    <h5 className="text-light mb-4">{props.user.name}</h5>
                    <p className="my-2 text-light">{props.user.bio}</p>
                    { (props.user.location && 
                        (props.user.location.city.trim() != '') &&
                        (props.user.location.state.trim() != '') &&
                        (props.user.location.country.trim() != '')
                        ) && 
                        <p className="my-2 text-light">
                            <MdLocationPin className="me-3" size={25} />
                            { (props.user.location.city.trim() != '') &&
                                <>
                                    {props.user.location.city},&nbsp;
                                </>
                            }
                            { (props.user.location.state.trim() != '') &&
                                <>
                                    {props.user.location.state},&nbsp;
                                </>
                            }
                            { (props.user.location.country.trim() != '') &&
                                <>
                                    {props.user.location.country}
                                </>
                            }
                        </p>
                    }
                    <hr className="text-light" />
                    
                    {/* Followers section */}
                    <div className="row gx-0 my-5 text-light mx-lg-5">
                        <div className="col text-center">
                            <h3>{posts}</h3>
                            <p>Posts</p>
                        </div>
                        <div className="col text-center">
                            <h3>{followers}</h3>
                            <p>Followers</p>
                        </div>
                        <div className="col text-center">
                            <h3>{following}</h3>
                            <p>Following</p>
                        </div>
                    </div>

                    {/* Follow button */}
                    {(!props.isMe) && 
                        <>
                            { (!isFollowing) && 
                                <button ref={followBtn} onClick={follow} className="btn follow-btn btn-light text-base">Follow</button>
                            }
                            { (isFollowing) && 
                                <button ref={followBtn} className="btn follow-btn btn-light text-base" onClick={unfollowClicked}>
                                    Unfollow
                                </button>
                            }
                        </>
                    }
                    { (props.isMe) && 
                        <button onClick={() => props.setEditMode(true)} className="btn d-flexbox align-items-center follow-btn btn-light text-base">
                            Edit Profile
                            <MdEdit className="text-base ms-3"></MdEdit>
                        </button>
                    }

            </div>
    );
}

export default memo(UserMainContent);