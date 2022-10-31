import { useEffect } from "react";
import { memo } from "react";
import '../styles/home.css';
import {  MdComment,MdOutlineChatBubbleOutline } from "react-icons/md";
import {  BiFlag, BiHeart } from "react-icons/bi";
import {  BsSuitHeartFill } from "react-icons/bs";
import {  AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";

import { useState } from "react";


function PostBlock(props){

    const [liked,setLiked]=useState(false);
    const [likeArray, setLikeArray] = useState(props.postObj.likes);
    const [flag,setFlag]=useState(false);
    
    async function clickLike(){
        setLiked(true);
        const req = await fetch('/posts/likePost',{
            method :'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                owner:props.postObj.username,
                person:window.sessionStorage.getItem('username'),
                id:props.postObj.id}),
        });
        const res = await req.json();
        if(res.status == true)
            setLikeArray([...likeArray, window.sessionStorage.getItem("username")]);
    }

    function addComment(){
        props.modalShow(props.postObj,props.postObj.type);
    }

    useEffect(()=>{
        const i = props.postObj.likes.indexOf(window.sessionStorage.getItem('username'));
        // console.log(props);
        if(i !== -1) {
            setLiked(true);
            setFlag(true);
        }

        console.log(props.postObj);
    },[]);
    return(
        <center><div className="my-4 block pt-0 border shadow" >
            <div className="d-flex pt-0 align-items-center">
                <div className="mx-2">
                    <img alt="" width={40} src={`http://localhost:4000/static/profilePics/${(props.postObj.profilePic) ? props.postObj.profilePic : "default_.png"}`} className="mx-4 border" height={40} style={{borderRadius: "50%"}} />
                </div>
                <div className="text-start w-100">
                    <p style={{fontSize: 16}} className="my-1">{props.postObj.name}</p>
                    <p style={{fontSize: 14}} className=" my-1 text-secondary">{props.postObj.username}</p>
                </div>
                
            </div>
            <hr style={{marginTop:-1}}/>
            {
                (props.postObj.type == "pic") &&
                <div className="row" >
                <img alt="" src={`http://localhost:4000/static/posts/${props.postObj.content.url}`} className="mx-auto image-post" style={{width: "auto", maxHeight: "500px"}}  />
                </div>
            }
            {
                (props.postObj.type == "text") &&
                <div className="text-start px-3" style={{"wordWrap": "break-word"}} dangerouslySetInnerHTML={{__html: props.postObj.content.text}}></div>
            }
            <hr />
            <div className="row w-100 mx-3 my-3">
                <div className="col-1">

                    {!(liked || flag) && <AiOutlineHeart color="black" size={25} onClick={clickLike} style={{cursor: 'pointer'}}></AiOutlineHeart>}
                    {(liked || flag) && <AiFillHeart color="red" size={25} onClick={clickLike} ></AiFillHeart>}

                </div>
                <div className="col-1">
                    <MdOutlineChatBubbleOutline color="black" size={23} onClick={addComment} style={{cursor: 'pointer'}}></MdOutlineChatBubbleOutline>
                </div>
                <div className="col-9 text-end" style={{color:'grey',fontFamily:'calibri'}}>
                    <b>{likeArray.length} </b> Likes
                    &nbsp;<GoPrimitiveDot color="grey"/>
                    &nbsp; <b>{props.postObj.comments.length}</b> Comments
                </div>
            </div>

            { (props.postObj.content.caption && props.postObj.content.caption != "null") &&
                <div className="my-3 text-start px-3 mx-3">
                    <strong>{props.postObj.username}</strong> &nbsp; 
                    <span dangerouslySetInnerHTML={{__html: props.postObj.content.caption}}></span>
                </div>
            }
        </div></center>
    );
}

export default memo(PostBlock);