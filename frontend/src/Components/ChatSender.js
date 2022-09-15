import { memo, useState, useRef, useEffect } from "react";
import { ReactSession }  from 'react-client-session';
import socketIOClient from "socket.io-client";
const urlServer = "http://127.0.0.1:5000";

function Chat(props) {
    return (
        <>
            <div className={((props.me) ? "right " : "left ") + "bg-grey chat my-2 px-3 pt-2"}>
                <p className="mb-0">{props.text}</p>
                <p className="text-end text-secondary mb-0" style={{fontSize: 14}}>{props.time}</p>
            </div>
        </>
    );
}

function ChatSender(props) {
    const socket = socketIOClient(urlServer);
    socket.on('msgOther',(msg)=>{
        
    })
    useEffect(
        ()=>{
            
        }
    )

    const [chatText, setChatText] = useState("");
    const [chat_list, setChatList] = useState(props.user.chats);
    const chatBar = useRef();

    const changeText = () => setChatText(chatBar.current.value);

    const sendText = () => {
        const timestamp = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`;
        setChatList([{time: timestamp, content: chatText}, ...chat_list]);
        setChatText("");
        let msg = {
            sender : ReactSession.get("username"),
            reciever : props.user.username , //have to add this username property in user object
            text : chatText,
            time : timestamp
        };
        socket.emit("msgSent",msg);
    }

    function closeChat() {
        props.caller(undefined);
    }

    useEffect(() => {
        setChatList((props.user) ? props.user.chats : []);
    }, [props.user]);

    return (
        (props.user != undefined) && <>
            <div id="chat_section" className="container-fluid px-0 min-vh-100 position-relative" style={{overflowY: "hidden", maxHeight: "100vh"}}>
                <div className="py-3 d-flex bg-light border-bottom border-2 text-end">
                    <button className="btn btn-close my-auto mx-3" onClick={closeChat}></button>
                    <img alt="" src={process.env.PUBLIC_URL + `./media/svgs/${props.user.profilePic}.svg`} className="mx-4 border" width={40} height={40} style={{borderRadius: "50%"}} />
                    <div className="text-start w-100 my-auto mx-3">{props.user.name}</div>
                </div>
                <div className="position-absolute start-0 end-0 chat_container">
                    {
                        chat_list.map(ele => <Chat me={true} time={ele.time} text={ele.content} />)
                    }
                </div>
                <div className="position-absolute py-3 container-fluid bottom-0">
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <input ref={chatBar} value={chatText} onChange={changeText} type="text" className="input-control form-control px-3" placeholder="Type a message..." />
                        <input onClick={sendText} type="submit" className="btn btn-base mx-3 px-4 py-2" value={"Send"} />
                    </form>
                </div> 
            </div>
        </>
    );
}

export default memo(ChatSender);