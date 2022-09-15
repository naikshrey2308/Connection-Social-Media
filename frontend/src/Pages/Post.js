import { memo, useRef, useState } from "react";
import { ReactSession } from "react-client-session";
import axios from "axios";

function PostUploader(props) {
    const [post, setPost] = useState(null);
    const [caption, setCaption] = useState(null);

    const postRef = useRef();
    const captionRef = useRef();

    const changePost = () => setPost(postRef.current.files[0]);
    const changeCaption = () => setCaption(captionRef.current.value);

    async function handleSubmit() {
        let data = new FormData();
        data.set("username", "shrey.23");
        data.set("type", "pic");
        data.set("caption", caption);
        data.append("postPic", post);

        let res = await axios.post("/posts/create", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log(res.data);
    }

    return (
        <>
            <p>{ReactSession.get("username")}</p>
            <form className="form" encType="multipart/form-data">
                <input ref={postRef} className="input-control" type="file" name="postPic" onChange={changePost} />
                <textarea ref={captionRef} onChange={changeCaption}></textarea>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Post</button>
            </form>
        </>
    );
}

function Post(props) {
    return (
        <>
            <PostUploader />
        </>
    );
}

export default memo(Post);