import { memo, useEffect, useState } from "react";
import UserMainContent from "../Components/UserMainContent";
import UserAdditionalContent from "../Components/UserAdditionalContent";


function UserProfile(props) {
    
    const [user, setUser] = useState(null);
    const [me, setMe] =  useState(null);
    const [isMe, setIsMe] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        props.setNavbar(true);

        let url = window.location.href; 
        url = url.toString().split("users/");
        url = url[url.length - 1];
        url = (url == '') ? null : url;
        
        if(url == null || url.trim() == window.sessionStorage.getItem("username")) setIsMe(true);
        else setIsMe(false);

        (async () => {
            // Load the user data from the server
            let user1 = await fetch(`/user/getUser/${url ?? encodeURIComponent(window.sessionStorage.getItem("username"))}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            user1 = await user1.json();

            let me = await fetch(`/user/getUser/${encodeURIComponent(window.sessionStorage.getItem("username"))}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            me = await me.json();

            setUser(user1.user);
            setMe(me.user);
        })();

    }, []);

   

    return (
        <>
            {/* <Navbar /> */}
            {
            (user) && 
            <div className="row min-vh-100 gx-0">
                <div className="col-12 col-lg-4">
                    <UserMainContent trigger={trigger} setTrigger={setTrigger} editMode={editMode} setEditMode={setEditMode} isMe={isMe} me={me} setUser={setUser} user={user} /> 
                </div>
                <div className="col-12 col-lg-8"> 
                    <UserAdditionalContent trigger={trigger} setTrigger={setTrigger} editMode={editMode} setEditMode={setEditMode} isMe={isMe} me={me} setUser={setUser} user={user} />
                </div>

            </div>
            }
        </>
    );
}

export default memo(UserProfile);