import { memo, useState, useEffect } from "react";
import "../styles/user-profile.css";

function AboutContent(props) {
    return (
        <>
            <div className="container">
                { props.user.location &&
                    <p>📍 Lives in {props.user.location.city}, {props.user.location.state}, {props.user.location.country}</p>
                }
            </div>
        </>
    );
}

function UserAdditionalContent(props) {

    const [aboutActive, setAboutActive] = useState(true);
    const [textActive, setTextActive] = useState(false);
    const [imageActive, setImageActive] = useState(false);

    const makeAboutActive = () => {
        setAboutActive(true);
        setTextActive(false);
        setImageActive(false);
    }

    const makeImageActive = () => {
        setAboutActive(false);
        setTextActive(false);
        setImageActive(true);
    }

    const makeTextActive = () => {
        setAboutActive(false);
        setTextActive(true);
        setImageActive(false);
    }

    return (
        <>
            <div className="d-flex justify-content-evenly shadow border-bottom py-2 w-100">
                <div className={(aboutActive ? "active" : "")} onClick={makeAboutActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/about-section.svg"} width={35} height={35} />
                </div>
                <div className={(imageActive ? "active" : "")} onClick={makeImageActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/image-post.svg"} width={35} height={35} />
                </div>
                <div className={(textActive ? "active" : "")} onClick={makeTextActive}>
                    <img className="p-1" src={process.env.PUBLIC_URL + "/media/icons/text-post.svg"} width={35} height={35} />
                </div>
            </div>

            { aboutActive && <AboutContent user={props.user} /> }
        </>
    );
}

export default memo(UserAdditionalContent);