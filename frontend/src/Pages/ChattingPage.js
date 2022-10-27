import { memo, useEffect, useState } from "react";
import ChatLogs from "../Components/ChatLogs";
import ChatSender from "../Components/ChatSender";
import "../styles/chatpage.css";
// import socketIOClient from "socket.io-client";
// const urlServer = "http://127.0.0.1:5000";



// console.log(window.sessionStorage.getItem("name"));

function ChattingPage(props) {

    const [currUser, setCurrUser] = useState(undefined);
    const [allChats, setAllChats] = useState([]);
    const [indicator_, setIndicator] = useState({});

    function setChats(newChat){
        setAllChats(newChat);
    }

    useEffect(()=>{
        props.setNavbar(false);
        // (async function(){
        //     const req = fetch('/chats/getAllChat',{
        //         method : 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         },
        //         body: JSON.stringify({username : window.sessionStorage.getItem('username'), email : window.sessionStorage.getItem('email')}),
        //     });
        //     const res = await req.json();
        //     setAllChats(res.chat);
        // })();
        // (()=>{
        //     //         const socket = socketIOClient(urlServer);
            
        // })();
        let username1_ = window.sessionStorage.getItem('username');
        let username2_ = currUser ? currUser.username : '';

        (async ()=>{
            const req = await fetch('/chats/getChat',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({username1 : username1_, username2 : username2_}),
            });
            const res = await req.json();
            console.log(res);
            // return [res.chats,res.indicator];
            setAllChats(res.chat);
            setIndicator(res.indicator);
            console.log("hello");
            // const socket = socketIOClient(urlServer);
            console.log(indicator_);
        })();
        
        
    },[currUser])

    // console.log(window.sessionStorage.getItem("username"));
    
    // async function getChats(){
    //     // const chats = allChats.find((value)=>value.username === currUser.username)
    //     // return chats;
    //     let username1_ = window.sessionStorage.getItem('username');
    //     let username2_ = currUser.username;

    //     const req = await fetch('/chats/getChat',{
    //         method : 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({username1 : username1_, username2 : username2_}),
        
    //     });
    //     const res = await req.json();
    //     // console.log(res);
    //     return [res.chats,res.indicator]; 
    // }

    return (
        <>
            <div className="row g-0 min-vh-100">

                <div className={"col-12 col-lg-4 d-none d-lg-block border-end border-2"}><ChatLogs caller={setCurrUser} /></div>
                {currUser && <>
                    <div className="col">
                        <ChatSender  user={currUser} caller={setCurrUser} chats={allChats} indicator={indicator_} setChat={setChats}/>
                    </div>
                </>
                }
                {!currUser && <>
                    <div className="col d-none d-lg-block position-relative">  
                        <div className="no-chats">
                            <img className="no-chats-img" src ={process.env.PUBLIC_URL + "/media/svgs/no-chats.svg"} />
                            <p className="text-center fs-4 my-3">No chats to show.</p>
                            <p className="text-center fs-6 my-3 text-secondary">Click on a user in the left pane to chat with them.</p>
                        </div>
                    </div>
                </>
                }
            </div>
        </>
    );
}

export default memo(ChattingPage);