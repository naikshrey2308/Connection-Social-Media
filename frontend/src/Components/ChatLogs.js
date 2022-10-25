import { memo, useEffect, useRef, useState } from "react";
// import User from "../../../backend/schema/user";
import ChatSender from "./ChatSender";

// const chats = [
//     {name: "Shruti Patel", profilePic: "world-location", 
//     chats: [ {content: "Hii", time: "1" }, { content: "Hello!!!", time: "4" } ]},
//     {name: "Shrey Naik", profilePic: "mobile", 
//     chats: []},
// ];



function SearchChatLog(props) {

    // const [commonNames_,setCommonNames_]= useState([]);
    const [commonObject_,setCommonObject_]= useState([]);

    useEffect(()=>{
        (async function(){
            const req = await fetch('/user/getFollowersFollowing',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({emailSession:window.sessionStorage.getItem('email')}),
            });
            const res = await req.json();
            // setCommonNames_(res.result_name);
            await setCommonObject_(res.result);
            console.log(commonObject_);
        })();
    },[])

    const [search, setSearch] = useState("");
    const searchBar = useRef();
    const iconLink = useRef();

    const changeSearch = (setNewPeople) => {

        if(searchBar.current.value===''){
            setNewPeople([]);
        }
        setSearch(searchBar.current.value);
        // console.log(search);
        if(searchBar.current.value!==''){
            var regex_ = new RegExp("^"+searchBar.current.value,'g');
            console.log(regex_);

            // const commonName = commonNames_.filter(value => regex_.test(value));
            const commonPerson = commonObject_.filter(value => regex_.test(value.name));
            console.log(commonPerson);

            setNewPeople(commonPerson);
        }
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
                <input ref={searchBar} name="search_chat" id="search_chat" type="text" className="input-control form-control py-2 px-3" value={search} onChange={()=>{changeSearch(props.setNewPeople)}} placeholder="Search Friend" style={{borderRadius: "25px", fontSize: 14}} />
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
                <img src={`http://localhost:4000/static/profilePics/${props.user.profilePic}`} className="mx-4 border" width={40} height={40} style={{borderRadius: "50%"}} />
                <div className="text-start w-100 my-auto mx-3">{props.user.name}</div>
            </div>
        </>
    );
}

function ChatList(props) {
    console.log("inside chatlist");
    console.log(props);
    return (
        <>
            {
                props.people_.map(ele => <UserChatBlock user={ele} caller={props.caller} />)
            }
        </>
    );
}

function ChatLogs(props) {
    const [chats,setChats] =useState([]);
    useEffect(()=>{
        (async function(){
            const req = fetch('/chats/getPeopleForChat',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({emailSession : window.sessionStorage.getItem('email')}),
            });
            let res = await req.json();
            await setChats(res.people);
        })();
    },[])

    function setChatFromSearch(chat_new){
        setChats(chat_new);
    }

    return (
        <>
            <div id="chat_logs" className="container-fluid my-5">
                <SearchChatLog setNewPeople={setChatFromSearch}/>
                <ChatList caller={props.caller} people_={chats}/>
            </div>
        </>
    );
}

export default memo(ChatLogs);