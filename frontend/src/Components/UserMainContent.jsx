import { memo } from "react";
import "../styles/user-profile.css";

function UserMainContent(props) {
    return (
        <>
            <div className="bg-base position-relative" style={{height: "100%"}}>
                <div style={{"transform": "translate(-50%, -50%)"}} className="position-absolute top-50 start-50 w-100 text-center">
                    {/* Basic information section */}
                    <img src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg" width={200} height={200} className="profile-image d-block mx-auto" />
                    <h2 className="text-light my-4">{props.user.name}</h2>
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
            </div>
        </>
    );
}

export default memo(UserMainContent);