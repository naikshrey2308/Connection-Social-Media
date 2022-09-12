import { memo, useRef, useState } from "react";

function PostUploader(props) {
    const [post, setPost] = useState(null);
    const [caption, setCaption] = useState(null);

    const postRef = useRef();
    const captionRef = useRef();

    const changePost = () => setPost(postRef.current.files[0]);
    const changeCaption = () => setCaption(captionRef.current.value);

    async function handleSubmit(e) {
        e.preventDefault();
        let data = new FormData();
        data.set("user_id", "1");
        data.set("type", "pic");
        data.set("caption", caption);
        data.append("postPic", post);

        
    }

    return (
        <>
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