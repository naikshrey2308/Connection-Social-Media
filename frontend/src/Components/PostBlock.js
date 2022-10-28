import { useEffect } from "react";
import { memo } from "react";
import '../styles/home.css';
import {  MdComment,MdOutlineChatBubbleOutline } from "react-icons/md";
import {  BiFlag, BiHeart } from "react-icons/bi";
import {  BsSuitHeartFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

import { useState } from "react";


function PostBlock(props){

    const [liked,setLiked]=useState(false);
    const [likeArray,setLikeArray]=useState(props.postObj.likes);
    const [flag,setFlag]=useState(false);


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
                body: JSON.stringify({owner:props.postObj.username,person:window.sessionStorage.getItem('username'),id:props.postObj.id}),
            });
            const res = await req.json();
            setLikeArray(res.newOne.likes);
        })();
    }

    function addComment(){
        props.modalShow(props.postObj);
    }

    useEffect(()=>{
        const i = props.postObj.likes.findIndex((val)=>val.person===window.sessionStorage.getItem('username'));
        // console.log(props);
        if(i!==-1){
            setFlag(true);
        }
    },[]);
    return(
        <center><div className="my-4 block shadow" >
            <div className="row">
                <div className="col-1">
                    <img alt="" src={`http://localhost:4000/static/profilePics/${props.postObj.profilePic}`} className="mx-4 border" width={30} height={30} style={{borderRadius: "50%"}} />
                </div>
                <div className="col-3 my-2">
                    <h6>{props.postObj.name}</h6>
                    
                </div>
                
            </div>
            <hr style={{marginTop:-1}}/>
            <div className="row" >
                <img alt="" src={`http://localhost:4000/static/posts/${props.postObj.content.url}`} className="mx-3 image-post"  />
            </div>
            <hr />
            <div className="row w-100 mx-3 my-3">
                <div className="col-1">

                    {!(liked || flag) && <BiHeart color="black" size={25} onClick={clickLike} style={{cursor: 'pointer'}}></BiHeart>}
                    {(liked || flag) && <BsSuitHeartFill color="red" size={25} onClick={clickLike} ></BsSuitHeartFill>}

                </div>
                <div className="col-1">
                    <MdOutlineChatBubbleOutline color="black" size={23} onClick={addComment} style={{cursor: 'pointer'}}></MdOutlineChatBubbleOutline>
                </div>
                <div className="col-9 text-end" style={{color:'grey',fontFamily:'calibri'}}>
                    <b>{props.postObj.likes.length} </b> Likes
                    &nbsp;<GoPrimitiveDot color="grey"/>
                    &nbsp; <b>{props.postObj.comments.length}</b> Comments
                </div>
            </div>

            <div className="row my-2 mx-3">
                {/* {props.postObj.content.caption ? props.postObj.content.caption : <></>} */}
            </div>
        </div></center>
    );
}

export default memo(PostBlock);