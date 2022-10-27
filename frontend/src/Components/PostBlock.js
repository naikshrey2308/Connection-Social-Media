import { useEffect } from "react";
import { memo } from "react";
import '../styles/home.css';
import {  MdComment } from "react-icons/md";
import {  BiHeart } from "react-icons/bi";
import {  BsSuitHeartFill } from "react-icons/bs";

import { useState } from "react";


function PostBlock(props){

    const [liked,setLiked]=useState(false);
    const [likeArray,setLikeArray]=useState(props.postObj.likes);

    // useEffect(()=>{
    //     console.log(props);
    // },[]);

    
    function clickLike(){
        setLiked(true);
        (async function(){
            const req = await fetch('/posts/likePost',{
                method :'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({owner:props.postObj.username,person:window.sessionStorage.getItem('username')}),
            });
            const res = await req.json();
            setLikeArray(res.newOne.likes);
        })();
    }

    function addComment(){
        props.modalShow(props.postObj);
    }

    return(
        <center><div className="my-3 block">
            <div className="row">
                <div className="col-1">
                    <img alt="" src={`http://localhost:4000/static/profilePics/${props.postObj.profilePic}`} className="mx-4 border" width={30} height={30} style={{borderRadius: "50%"}} />
                </div>
                <div className="col-3 my-2">
                    <h6>{props.postObj.name}</h6>
                </div>
            </div>
            <div className="row">
                <img alt="" src={`http://localhost:4000/static/posts/${props.postObj.content.url}`} className="mx-3 image-post"  />
            </div>
            <div className="row mx-3 my-3">
                <div className="col-1">
                    {!liked && <BiHeart color="black" size={25} onClick={clickLike} style={{cursor: 'pointer'}}></BiHeart>}
                    {liked && <BsSuitHeartFill color="red" size={25} onClick={clickLike} ></BsSuitHeartFill>}

                </div>
                <div className="col-1">
                    <MdComment color="black" size={25} onClick={addComment} style={{cursor: 'pointer'}}></MdComment>
                </div>
            </div>
            {/* <div className="row my-2 mx-3">
                {props.postObj.content.caption!==null ? props.postObj.content.caption : <p></p>}
            </div> */}
        </div></center>
    );
}

export default memo(PostBlock);