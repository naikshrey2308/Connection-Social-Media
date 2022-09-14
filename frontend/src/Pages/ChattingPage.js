import { memo, useState } from "react";
import ChatLogs from "../Components/ChatLogs";
import ChatSender from "../Components/ChatSender";
import "../styles/chatpage.css";
import Navbar from "../Components/Navbar";
import { ReactSession }  from 'react-client-session';


const chats = [
    // {name: "Shruti Patel", profilePic: "world-location", 
    // chats: [ {content: "Hii", time: "1" }, { content: "Hello!!!", time: "4" } ]},
    // {name: "Shrey Naik", profilePic: "mobile"},
];

function ChattingPage(props) {
    const preprocessing = async (event) => {
        event.preventDefault();
        const params = {
            username: ReactSession.get("username"),
        }
        const req = await fetch("/chats/getAllChat", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(params),
        });
        const res = await req.json();
        chats=res.chat;
    }
    const [currUser, setCurrUser] = useState(undefined);

    return (
        <>
            <div className="row g-0 min-vh-100">

                
                {currUser && <>
                    <div className={"col-12 col-lg-4 d-none d-lg-block border-end border-2"}><ChatLogs caller={setCurrUser} /></div>
                    <div className="col">
                        <ChatSender user={{user:currUser,chats:chats}} caller={ReactSession.get("username")} />
                    </div>
                </>
                }
                {!currUser && <>
                    <div className={"col-12 col-lg-4 border-end border-2"}><ChatLogs caller={setCurrUser} /></div>
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