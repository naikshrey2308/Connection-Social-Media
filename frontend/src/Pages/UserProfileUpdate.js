import ManageProfile from "../Components/ManageProfile";
import { memo } from "react";
import "../styles/userProfile.css";
import { ReactSession }  from 'react-client-session';


function UserProfileUpdatePage() {
    let person={
        id:1,
        name:"Shrey Ketan Naik",
        username:"naikshrey2308",
        birthdate:new Date(2002,8,23),
        phoneNo:"9345673376",
        posts:2,
        followers:100,
        following:200,
    }
    let posts=[
                {
                    id:person.id.toString()+"_1",
                    creation_date:new Date(2013,8,23),
                    caption:"Waiting for the day when india will be super power and rule over the world.",
                    comments:[
                                { text:"keep it up!!", commentor:"shruti patel", likes:17},
                                { text:"The people like you need in india", commentor:"vedant parikh",likes:12},
                            ]
               },
               {
                id:person.id.toString()+"_2",
                creation_date:new Date(2021,3,29),
                caption:"Let's enjoy the time which is left in the life!!",
                comments:[
                            { text:"good luck for your journey!!", commentor:"shruti patel", likes:17},
                            { text:"The people like you need in india", commentor:"vedant parikh",likes:12},
                        ]
           },
              ];
    person.profilePic=person.id.toString();
    console.log(ReactSession.get("username"));

    return(
        <ManageProfile user={person} />
    );
}

export default memo(UserProfileUpdatePage);