import { memo, useState, useRef, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// const urlServer = "http://127.0.0.1:5000";



function Chat(props) {

    console.log(props);

    return (
        <>
            <div className={(props.indicator_.sent===props.flag ? "right " : "left ") + "bg-grey chat my-2 px-3 pt-2"}>
                <p className="mb-0">{props.text}</p>
                <p className="text-end text-secondary mb-0" style={{fontSize: 14}}>{props.time}</p>
            </div>
        </>
    );
}

function ChatSender(props) {
    // const socket ={};
    // socket.on('msgOther',(msg)=>{
    //     if(msg.sender === props.user.username){
    //         var array = props.chats;
    //         if(array){
    //             array.push(msg)
    //         }
    //         else{
    //             array=[msg]
    //         }
    //         props.setChat(array);
    //     }
    //     else{
            
    //     }
    // })


    const [chatText, setChatText] = useState("");
    
    const chatBar = useRef();

    const changeText = () => setChatText(chatBar.current.value);

    const sendText = () => {
        const timestamp = `${(new Date()).getHours()}:${(new Date()).getMinutes()}`;
        var array = props.chats;
        if(array){
            array.push({
                time : timestamp,
                text: chatBar.current.value,
                flag : props.indicator.sent
            })
        }
        else{
            array=[{
                time : timestamp,
                text : chatBar.current.value,
                flag : props.indicator.sent
            }]
        }
        props.setChat(array);
        setChatText("");
        let msg = {
            sender : window.sessionStorage.getItem('username'),
            reciever : props.user.username , //have to add this username property in user object
            text : chatText,
            time : timestamp
        };
        // socket.emit("msgSent",msg);
        (async function(){
            console.log("inside function insert")
            const req = await fetch('/chats/insertChat',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({chat:msg , email_:window.sessionStorage.getItem('email') , user:props.user , username:window.sessionStorage.getItem('username') , name:window.sessionStorage.getItem('name') , profilePic : window.sessionStorage.getItem('profilePic')}),
            
            });
        })();
    }

    function closeChat() {
        props.caller(undefined);
    }

    useEffect(() => {
        // setChatList((props.chats) ? props.chats : []);
        console.log(props.chats);
    },[]);

    return (
        (props.user != undefined) && <>
            <div id="chat_section" className="container-fluid px-0 min-vh-100 position-relative" style={{maxHeight: "100vh"}}>
                <div className="py-3 d-flex bg-light border-bottom border-2 text-end">
                    <button className="btn btn-close my-auto mx-3" onClick={closeChat}></button>
                    <img alt="" src={`http://localhost:4000/static/profilePics/${props.user.profilePic}`} className="mx-4 border" width={40} height={40} style={{borderRadius: "50%"}} />
                    <div className="text-start w-100 my-auto mx-3">{props.user.name}</div>
                </div>
                {props.chats && <div className="chat_container">
                    {
                         props.chats.map(ele => <Chat indicator_={props.indicator} flag={ele.flag} time={ele.time} text={ele.text} />) 
                    }
                </div>}
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