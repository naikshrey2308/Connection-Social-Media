import { memo, useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import "../styles/discover.css";



function FriendCard(props) {

    const followBtn = useRef();

    const [isFollowing, setIsFollowing] = useState(props.isFollowed);

    const navigate = useNavigate();
    props = props.data;

    const  followevent = async (user)=> {
        // console.log("inside follow function"+window.sessionStorage.getItem('email'));
        const req = await fetch("/user/follow",{
            method: "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                email:user.email,
                email_session:window.sessionStorage.getItem('email')
            })
        });
    
        const res = await req.json();
    };

    function viewProfileClicked(user){
        // console.log(props);
        navigate(`/users/${user.username}`);
    }

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
        // setFollowers(followers + 1);
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
        
        // console.log("ansdjnaslkdnaklsdnas");

        const res = await req.json();       
        // setFollowers(followers - 1); 

        props.setTrigger(!props.trigger);
        setIsFollowing(false);
    }


    return (
        <>
            {/* Finder card for people */}
            <div className="friend-finder-card card border-0 container">
                <img src={`http://localhost:4000/static/profilePics/${props.profilePic}`} className="p-3 card-img-circled" />
                <div className="card-body text-center">
                    <h3>{props.name}</h3>
                    <p>{props.subtitle}</p>
                    { (!isFollowing) && 
                        <button ref={followBtn} onClick={follow} className="btn follow-btn btn-light text-base">Follow</button>
                    }
                    { (isFollowing) && 
                        <button ref={followBtn} className="btn follow-btn btn-light text-base" onClick={unfollowClicked}>
                            Unfollow
                        </button>
                    }
                    <p className="text-center"><button className="btn px-4 py-2" onClick={()=>{viewProfileClicked(props)}}>View Profile</button></p>
                </div>
            </div>
        </>
    );
}

var suggestions=[];



function FriendCarousel(props) {

    const [suggestedFriends,setSuggestedFriends]=useState([]);
    useEffect(() => {
        // console.log("before");
        
        (async function() {
            // console.log("inside1");
            let req = await fetch('/user/getRandomPeople', {
                method:'POST',   
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify({
                    email: window.sessionStorage.getItem("email"),
                })
            });
            let res = await req.json();
            // console.log("inside2");
            suggestions = res.people;
            // console.log(suggestions);
            setSuggestedFriends(suggestions);
        })();

        
    }, []);

    return (
        <>
            { (suggestedFriends) && <div id="friend-carousel" className="carousel carousel-dark slide" data-bs-interval="false">
                <div className="carousel-inner">
                {
                    suggestedFriends.map((ele, ind) => {
                        return (
                            <div className={((ind == 0) ? "active " : "") + "carousel-item"}>
                                <FriendCard data={ele} />
                            </div>
                        );
                    })
                }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#friend-carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#friend-carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            }
        </>
    );
}



function FriendRow(props) {

    
    return (
        <>
            <div className="d-flex px-3 justify-content-start">
                <img src={`http://localhost:4000/static/profilePics/${props.data.profilePic}`} width={40} height={40} className="border p-1 me-5" style={{borderRadius: "50%"}} />
                <p className="fs-7 my-auto w-100">{props.data.name}</p>
                <button className="btn btn-sm btn-light text-base m-0 px-4" >Follow</button>
            </div>
            <br />
        </>
    );
}

function FriendRows() {

    // fetchRandomPeople();
    // let suggestedFriends = suggestions;
    // let suggestedFriends = [
    //     {
    //         name: "Shrey Naik",
    //         subtitle: "Lives near your area",
    //         profilePic: "snapshot.png"
    //     },
    //     {
    //         name: "Shruti Patel",
    //         subtitle: "Matches your vibe",
    //         profilePic: "S.png"
    //     }, 
    //     {
    //         name: "Vedant Parikh",
    //         subtitle: "Lives near your area",
    //         profilePic: "spaceman.jpg"
    //     },
    // ];

    // suggestedFriends = suggestedFriends.concat(suggestedFriends);   
    // suggestedFriends = suggestedFriends.concat(suggestedFriends);

    const [suggestedFriends,setSuggestedFriends]=useState([]);
    useEffect(() => {
        // console.log("before___");
        
        (async function() {
            // console.log("inside1");
            let req = await fetch('/user/getRandomPeople', {
                method:'POST',   
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify({
                    email: window.sessionStorage.getItem("email"),
                })
            });
            let res = await req.json();
            // console.log("inside2____");
            suggestions = res.people;

            // console.log(suggestions);
            setSuggestedFriends(suggestions);
        })();

        
    }, []);

    return (
        <>
            <h3 className="text-center my-5 pt-5">People You May Know</h3>
            <div className="container row g-0 mx-auto">
                <div className="col-12 col-sm-6 col-lg-4 mx-auto my-3">
                {
                    suggestedFriends.filter((ele, ind) => ind % 2 == 0).map((ele, ind) => {
                        return (
                            <FriendRow data={ele} />
                        );
                    })
                }
                </div>
                <div className="col-12 col-sm-6 col-lg-4 mx-auto my-3">
                {
                    suggestedFriends.filter((ele, ind) => ind % 2 == 1).map((ele, ind) => {
                        return (
                            <FriendRow data={ele} />
                        );
                    })
                }
                </div>
            </div>
        </>
    );
}

function Finder() {
    return (
        <>
            <div className="friend-finder-base bg-base position-relative container">
                <div className="friend-finder-main position-absolute top-50 start-50">
                    <h3 className="text-light fw-bold">Hello <u>{window.sessionStorage.getItem('username')}</u>, looking for more connections?</h3>
                    <p className="text-center text-light">Here are some top picks for you!</p>
                
                    <FriendCarousel />
                </div>
            </div>

            <FriendRows />

        </>
    );
}

function Discover(props) {

    const [temp, setTemp] = useState("Shrey");

    useEffect(() => {
        props.setNavbar(true);

        // async function getData() {
        //     try {
        //         let resText = await fetch("/user/current");
        //         resText = await resText.json();
        //         console.log(resText);
        //         setTemp(resText);
        //     } catch(err) {
        //         console.log("error: ", err);
        //     }
        // }
        // getData();
    }, []);

    return (
        <>
            {/* <Navbar /> */}
            {/* Find friends that near you and match your vibes */}
            <Finder />
        </>
    );
}

export default memo(Discover);