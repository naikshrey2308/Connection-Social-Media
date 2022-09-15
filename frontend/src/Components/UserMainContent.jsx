import { memo } from "react";
import "../styles/user-profile.css";

function UserMainContent(props) {
    return (
            <div className="set-nav-align position-fixed col-lg-4 col-12 text-center bg-base py-5" style={{height: "100vh"}}>
                
                    {/* Basic information section */}
                    <img src={ "/profilePics/" + ((props.user.profilePic) ? (props.user.profilePic.name) : "default.png") } width={200} height={200} className="profile-image d-block mx-auto" />
                    <h4 className="text-light mt-4 mb-2">@{props.user.username}</h4>
                    <h5 className="text-light mb-4">{props.user.name}</h5>
                    <p className="my-2 text-light">{props.user.bio}</p>
                    <hr className="text-light" />
                    
                    {/* Followers section */}
                    <div className="row gx-0 my-5 text-light mx-lg-5">
                        <div className="col text-center">
                            <h3>{props.user.posts.length}</h3>
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
                    <button className="btn follow-btn btn-light text-base">Follow</button> 

            </div>
    );
}

export default memo(UserMainContent);