import { memo, useEffect, useRef, useState } from "react";
import { MdCheck, MdEdit } from "react-icons/md";
import "../styles/user-profile.css";

function UserMainContent(props) {

    const followBtn = useRef();
    const isFollowing = props.me.following.includes(props.user.email);

    const [posts, setPosts] = useState(0);

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

        followBtn.current.style.opacity = 1;
        followBtn.current.innerHTML = "<span class='text-base'>Following</span>";        
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
    }, []);

    return (
            <div className="set-nav-align position-fixed col-lg-4 col-12 text-center bg-base py-5" style={{height: "100vh"}}>
                
                    {/* Basic information section */}
                    <img src={ "/profilePics/" + ((props.user.profilePic) ? (props.user.profilePic.name) : "default_.png") } width={200} height={200} className="profile-image d-block mx-auto" />
                    <h4 className="text-light mt-4 mb-2">@{props.user.username}</h4>
                    <h5 className="text-light mb-4">{props.user.name}</h5>
                    <p className="my-2 text-light">{props.user.bio}</p>
                    <hr className="text-light" />
                    
                    {/* Followers section */}
                    <div className="row gx-0 my-5 text-light mx-lg-5">
                        <div className="col text-center">
                            <h3>{posts}</h3>
                            <p>Posts</p>
                        </div>
                        <div className="col text-center">
                            <h3>{props.user.followers.length}</h3>
                            <p>Followers</p>
                        </div>
                        <div className="col text-center">
                            <h3>{props.user.following.length}</h3>
                            <p>Following</p>
                        </div>
                    </div>

                    {/* Follow button */}
                    { (!props.isMe && !isFollowing) && 
                        <button ref={followBtn} onClick={follow} className="btn follow-btn btn-light text-base">Follow</button>
                    }
                    { (!props.isMe && isFollowing) && 
                        <button className="btn follow-btn btn-light text-base">
                            <MdCheck className="text-base me-2" size={20}></MdCheck>
                            Following
                        </button>
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