import { memo, useEffect, useState } from "react";
import UserMainContent from "../Components/UserMainContent";
import UserAdditionalContent from "../Components/UserAdditionalContent";
import Navbar from "../Components/Navbar";
import axios from "axios";

function UserProfile(props) {
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        props.setNavbar(true);
        
        (async () => {
            // Load the user data from the server
            let user1 = await fetch(`/user/getUser/${encodeURIComponent("shrey.23")}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            user1 = await user1.json();

            setUser(user1.user);
        })();

    }, []);

    return (
        <>
            {/* <Navbar /> */}
            {
            (user) && 
            <div className="row min-vh-100 gx-0">
                <div className="col-12 col-lg-4">
                    <UserMainContent user={user} /> 
                </div>
                <div className="col-12 col-lg-8"> 
                    <UserAdditionalContent user={user} />
                </div>
            </div>
            }
        </>
    );
}

export default memo(UserProfile);