import { memo, useRef, useState } from "react";
import ChatSender from "./ChatSender";

const chats = [
    {name: "Shruti Patel", profilePic: "world-location", 
    chats: [ {content: "Hii", time: "1" }, { content: "Hello!!!", time: "4" } ]},
    {name: "Shrey Naik", profilePic: "mobile", 
    chats: []},
];

function SearchChatLog(props) {
    const [search, setSearch] = useState("");
    const searchBar = useRef();
    const iconLink = useRef();

    const changeSearch = () => {
        setSearch(searchBar.current.value);
    };

    const activateIcon = () => {
        iconLink.current.src = process.env.PUBLIC_URL + "/media/icons/home.svg";
    }

    const blurIcon = () => {
        iconLink.current.src = process.env.PUBLIC_URL + "/media/icons/home_hollow.svg";
    }

    return (
        <>
            <form className="form container d-flex text-center mt-3 mx-auto border-bottom border-2 pb-3">
                <a onMouseEnter={activateIcon} onMouseLeave={blurIcon} href="/home"><img ref={iconLink} src={process.env.PUBLIC_URL + "/media/icons/home_hollow.svg"} width={30} height={30} className="me-2 p-1 my-1" /></a>
                <input ref={searchBar} name="search_chat" id="search_chat" type="text" className="input-control form-control py-2 px-3" value={search} onChange={changeSearch} placeholder="Search for a user to chat with..." style={{borderRadius: "25px", fontSize: 14}} />
            </form>
        </>
    );
}

function UserChatBlock(props) {
    function activateChat() {
        props.caller(props.user);
    }

    return (
        <>
            <div className="d-flex user-chat-block border-bottom border-2 py-3" onClick={activateChat}>
                <img src={process.env.PUBLIC_URL + `./media/svgs/${props.user.profilePic}.svg`} className="mx-4 border" width={40} height={40} style={{borderRadius: "50%"}} />
                <div className="text-start w-100 my-auto mx-3">{props.user.name}</div>
            </div>
        </>
    );
}

function ChatList(props) {
    return (
        <>
            {
                chats.map(ele => <UserChatBlock user={ele} caller={props.caller} />)
            }
        </>
    );
}

function ChatLogs(props) {
    return (
        <>
            <div id="chat_logs" className="container-fluid my-5">
                <SearchChatLog />
                <ChatList caller={props.caller} />
            </div>
        </>
    );
}

export default memo(ChatLogs);