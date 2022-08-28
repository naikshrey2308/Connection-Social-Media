import { memo, useState } from "react";

import "../styles/userProfile.css";
function ManageProfile(props){
    return(
        <>
            <div className="main mx-2 my-5">
                <div className="bg mx-5"></div>
                <div className="row mx-5 d-flex main1 ">
                    <div className="col-xl-6 col-md-12 col-sm-12 d-flex align-content-center">
                        <img src={process.env.PUBLIC_URL + "/media/icons/account.svg"} className="profilepic rounded-circle img-responsive img-thumbnail mx-4"/> 
                        <div className="d-flex flex-column">
                            <div className="name my-1">{props.user.name}</div>
                            <div className="username my-1">@{props.user.username}</div>
                        </div>                   
                    </div>
                    <div className="col-xl-6 col-md-12 col-sm-12 d-flex">
                        <img src={process.env.PUBLIC_URL + "/media/icons/username.svg"} className="it rounded-circle img-responsive img-thumbnail mx-2" />
                        <img src={process.env.PUBLIC_URL + "/media/icons/username.svg"} className="it rounded-circle img-responsive img-thumbnail mx-2" />
                        <img src={process.env.PUBLIC_URL + "/media/icons/username.svg"} className="it rounded-circle img-responsive img-thumbnail mx-2" />
                    </div>
                </div>
                <center><div className="info row my-5 py-5 ">
                    <div className="col-xl-4 col-md-4 col-sm-12">
                        <center><div className="bold_ my-xl-1 my-md-2 my-sm-2"><b>{props.user.posts}</b></div>
                        <div className="text-muted my-xl-1 my-md-4 my-sm-4">Posts</div></center>
                    </div>
                    <div className="col-xl-4 col-md-4 col-sm-12">
                        <center><div className="bold_ my-xl-1 my-md-2 my-sm-2"><b>{props.user.followers}</b></div>
                        <div className="text-muted my-xl-1 my-md-3 my-sm-3">Followers</div> </center>
                    </div>
                    <div className="col-xl-4 col-md-4 col-sm-12">
                        <center><div className="bold_ my-xl-1 my-md-2 my-sm-2"><b>{props.user.following}</b></div>
                        <div className="text-muted my-xl-1 my-md-3 my-sm-3">Following</div></center>
                    </div>
                </div></center>
                <center><div className="access row">
                   <div className="col-md-12 col-xl-12 col-sm-12 align-content-center">
                        <img src={process.env.PUBLIC_URL + "/media/icons/post.svg"} className="aci rounded-circle img-responsive img-thumbnail mx-5" onClick="fpost"/>
                        <img src={process.env.PUBLIC_URL + "/media/icons/info.svg"} className="aci i rounded-circle img-responsive img-thumbnail mx-5" onClick="finfo"/>
                        <img src={process.env.PUBLIC_URL + "/media/icons/chat.svg"} className="aci rounded-circle img-responsive img-thumbnail mx-5" onClick="fchat"/>
                   </div>
                </div></center>
            </div>
        </>
    );
}

export default memo(ManageProfile);