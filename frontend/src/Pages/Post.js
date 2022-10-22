import { memo, useEffect, useContext, useRef, useState, createContext } from "react";
import { ReactSession } from "react-client-session";
import Navbar from "../Components/Navbar";

import { MdCollections, MdOutlineModeComment, MdTitle, MdCheck, MdEdit, MdClose, MdFontDownload, MdTextFormat, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdOutlineSuperscript, MdAddLink, MdOutlineList, MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { AiOutlineFontColors, AiOutlineHeart, AiOutlineUpload } from "react-icons/ai";
import { TbSuperscript, TbSubscript, TbStrikethrough } from "react-icons/tb";
import { HiOutlineUpload } from "react-icons/hi";
import { FiMoreVertical } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";

import { useNavigate } from "react-router";
import "../styles/post.css";
import axios from "axios";


/**
 * [PostContext] defines a context for the post web page.
 * When active is 0, it shows image post upload.
 * When active is 1, it shows text post upload.
 */
const PostContext = createContext();

/**
 * [ImagePostRendererContext] defines a context for UI prototype of the post.
 */
const ImagePostRendererContext = createContext();

function ImagePostRenderer(props) {

    const { post, caption, setPost, setCaption } = useContext(ImagePostRendererContext);

    const [path, setPath] = useState("");

    useEffect(() => {
        if (post) {
            const tempPath = URL.createObjectURL(post);
            setPath(tempPath);
        }
    }, [post]);

    const navigate = useNavigate();


    const postRef = useRef();
    const captionRef = useRef();
    const imageDisplayer = useRef();

    const changePost = () => {
        const tempPath = URL.createObjectURL(postRef.current.files[0]);
        setPath(tempPath);
        imageDisplayer.current.src = path;
        setPost(postRef.current.files[0]);
    }
    const changeCaption = () => setCaption(captionRef.current.innerHTML);

    async function handleSubmit() {
        changeCaption();

        alert(caption);

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

        navigate("/home");
    }

    return (
        <div className="shadow">
            <div className="d-flex bg-white shadow p-2 border-bottom">
                <img className="br-50p" src={process.env.PUBLIC_URL + "/media/profilePics/S.png"} width={30} />
                <p className="w-100 px-3 m-0">Shrey Naik</p>
                <div className="mx-2">
                    <FiMoreVertical></FiMoreVertical>
                </div>
                <div className="mx-2">
                    <button className="btn btn-white p-0" onClick={() => postRef.current.click()}>
                    <HiOutlineUpload color="black" style={{ cursor: "pointer" }}></HiOutlineUpload>
                    </button>
                </div>
                <div className="mx-2">
                    {
                    (post) &&
                    <button className="btn btn-white p-0" onClick={handleSubmit}>
                    <MdCheck color="cornflowerblue" style={{ cursor: "pointer" }}></MdCheck>
                    </button>
                    }
                </div>
            </div>
            <div className="text-center bg-white position-relative py-3">
                <img ref={imageDisplayer} src={(!post) ? process.env.PUBLIC_URL + "/media/profilePics/S.png" : path} width={200} className={(post) ? "" : "d-none"} />
                {
                    (!post) &&
                    <>
                    <BsUpload size={100}></BsUpload>
                    <br />
                    <br />
                    <p style={{fontSize: 14}}>No picture has been uploaded. Click <a role="button" onClick={() => postRef.current.click()} className="text-base">here</a> to upload.</p>
                    </>
                }
            </div>
            <div className="bg-white border-top">
                <div className="d-flex p-3">
                    <div className="mx-1">
                        <AiOutlineHeart></AiOutlineHeart>
                    </div>
                    <div className="mx-1">
                        <MdOutlineModeComment></MdOutlineModeComment>
                    </div>
                </div>
            </div>
            <div className="pb-2 bg-white position-relative">
                {
                    (post) &&
                    <p>
                        <p style={{ fontSize: "14px" }} className="px-3 bg-white">
                            <strong>shrey.23</strong>
                            &nbsp;
                            <div className="d-inline span-editable" ref={captionRef} contentEditable={(post) ? true : false}>
                                Write a caption
                            </div>
                        </p>
                    </p>
                }
            </div>

            <div className="d-none">
                <form className="form text-end" encType="multipart/form-data">
                    <input ref={postRef} className="input-control my-3 form-control" type="file" name="postPic" onChange={changePost} />
                </form>
            </div>
        </div>
    );
}

function TextPostRenderer(props) {

    const [text, setText] = useState(null);
    const [editOptions, setEditOptions] = useState(false);
    
    const [linkSetter, setLinkSetter] = useState(false);

    const toggleEditOptions = () => setEditOptions(!editOptions);

    const boldEditor = useRef();
    const italicEditor = useRef();
    const underlinedEditor = useRef();
    const linkEditor = useRef();
    const bulletedListEditor = useRef();
    const numberedListEditor = useRef();
    const fontColorEditor = useRef();
    const superScriptEditor = useRef();
    const subScriptEditor = useRef();

    const linkSetterRef = useRef();
    const textContentRef = useRef();

    const toggleLinkSetter = () => setLinkSetter(!linkSetter); 

    const navigate = useNavigate();

    const placeholderText = "Start Typing Here...";

    const [error, setError] = useState(null);

    function formatText(event, value) {
        const element = event.target;
        const action = element.id;
        document.execCommand(action, false, value);
    }

    function checkNull() {
        if(!textContentRef.current.innerHTML) {
            setError("Post cannot have empty text.");
        } else {
            setError(null);
        }
    }

    async function handleSubmit() {
        if(textContentRef.current.innerHTML == placeholderText) {
            setError("Post cannot have empty text. Kindly type something before posting.");
            return;
        }

        setText(textContentRef.current.innerHTML);
        // console.log(text);

        let data = new FormData();
        data.set("username", "shrey.23");
        data.set("type", "text");
        data.set("text", textContentRef.current.innerHTML);

        let res = await axios.post("/posts/create", data);

        console.log(res);

        alert("Done");
        navigate("/home");
    }

    return (
        <div className="shadow">
            {
                (error) && 
                <p style={{fontSize: 14}} className="px-2 alert alert-danger text-danger">{error}</p>
            }
            <div className="d-flex bg-white p-2 border-bottom">
                <img className="br-50p" src={process.env.PUBLIC_URL + "/media/profilePics/S.png"} width={30} />
                <p className="w-100 px-3 m-0">Shrey Naik</p>
                <div className="mx-2">
                    <FiMoreVertical></FiMoreVertical>
                </div>
                <div className="mx-2">
                    {(!editOptions) && 
                    <button className="btn btn-light p-0">
                        <MdEdit color="black" onClick={toggleEditOptions} style={{ cursor: "pointer" }}></MdEdit>
                    </button>
                    }
                    {(editOptions) && 
                    <button className="btn btn-light p-0">
                        <MdClose color="black" onClick={toggleEditOptions} style={{ cursor: "pointer" }}></MdClose>
                    </button>
                    }
                </div>
                <div className="mx-2">
                    <button className="btn btn-light p-0">
                    <MdCheck onClick={handleSubmit} color="cornflowerblue" style={{ cursor: "pointer" }}></MdCheck>
                    </button>
                </div>
            </div>

            {
                (editOptions) &&
                <div className="d-flex p-2 border-top border-bottom justify-content-between">
                <button className="btn btn-light p-0">
                    <MdFormatBold ref={boldEditor} onClick={formatText} id="bold" color="black" style={{ cursor: "pointer" }} size={20}></MdFormatBold>
                </button>
                <button className="btn btn-light p-0">
                    <MdFormatItalic ref={italicEditor} onClick={formatText} id="italic" color="black" style={{ cursor: "pointer" }} size={20}></MdFormatItalic>
                </button>
                <button className="btn btn-light p-0">
                    <MdFormatUnderlined ref={underlinedEditor} onClick={formatText} id="underline" color="black" style={{ cursor: "pointer" }} size={20}></MdFormatUnderlined>
                </button>
                <button className="btn btn-light p-0">
                    <TbStrikethrough ref={fontColorEditor} onClick={formatText} id="strikethrough" color="black" style={{ cursor: "pointer" }} size={20}></TbStrikethrough>
                </button>
                <button className="btn btn-light p-0">
                    <TbSuperscript ref={superScriptEditor} onClick={formatText} id="superscript" color="black" style={{ cursor: "pointer" }} size={20}></TbSuperscript>
                </button>
                <button className="btn btn-light p-0">
                    <TbSubscript ref={subScriptEditor} onClick={formatText} id="subscript" color="black" style={{ cursor: "pointer" }} size={20}></TbSubscript>
                </button>
                <button className="btn btn-light p-0">
                    <MdFormatListBulleted ref={bulletedListEditor} onClick={formatText} id="insertUnorderedList" color="black" style={{ cursor: "pointer" }} size={20}></MdFormatListBulleted>
                </button>
                <button className="btn btn-light p-0">
                    <MdFormatListNumbered ref={numberedListEditor} onClick={formatText} id="insertOrderedList" color="black" style={{ cursor: "pointer" }} size={20}></MdFormatListNumbered>
                </button>
                <button className="btn btn-light p-0">
                    <MdAddLink ref={linkEditor} onClick={toggleLinkSetter} id="createLink" color="black" style={{ cursor: "pointer" }} size={20}></MdAddLink>
                </button>
            </div>
            }
            {
                (editOptions && linkSetter) &&
                <div className="d-flex border-bottom border-2 my-2 p-2">
                    <input ref={linkSetterRef} className="form-control" placeholder="Place a URL address here..." />
                    <button className="btn btn-light px-3">
                    <MdCheck onClick={(e) => { 
                        formatText(e, linkSetterRef.current.value);
                        toggleLinkSetter();
                    }} id="createLink" color="black" style={{ cursor: "pointer" }} size={15}></MdCheck>
                </button>
                </div>
            }
            <div ref={textContentRef} onKeyDown={checkNull} className="text-editor bg-light position-relative p-3" contentEditable={true}>
                {placeholderText}
            </div>
            <div className="bg-white border-top">
                <div className="d-flex p-3">
                    <div className="mx-1">
                        <AiOutlineHeart></AiOutlineHeart>
                    </div>
                    <div className="mx-1">
                        <MdOutlineModeComment></MdOutlineModeComment>
                    </div>
                </div>
            </div>  
        </div>
    );
}

function Selector(props) {

    const { active, setActive, tileOptions } = useContext(PostContext);

    return (
        <>
            <div className="selector row gx-0">
                <div className={((active == tileOptions.IMAGE) ? "active-tile " : "") + "tile col-6 text-center my-3"}>
                    <button type="button" className="bg-white opacity-50 px-2 py-2 br-50p btn btn-transparent border-0" onClick={() => setActive(tileOptions.IMAGE)}>
                        <MdCollections size={20}></MdCollections>
                    </button>
                </div>
                <div className={((active == tileOptions.TEXT) ? "active-tile " : "") + "tile col-6 text-center my-3"}>
                    <button type="button" className="bg-white opacity-50 px-2 py-2 br-50p btn btn-transparent border-0" onClick={() => setActive(tileOptions.TEXT)}>
                        <MdTitle size={20}></MdTitle>
                    </button>
                </div>
            </div>
        </>
    );
}

function Post(props) {

    const tileOptions = {
        IMAGE: 0,
        TEXT: 1,
    }

    const [active, setActive] = useState(tileOptions.IMAGE);
    const [post, setPost] = useState(null);
    const [caption, setCaption] = useState(null);

    return (
        <div className="min-vh-100 bg-base">
            <PostContext.Provider value={{ active, setActive, tileOptions }}>
                <ImagePostRendererContext.Provider value={{ post, caption, setPost, setCaption }}>
                    {/* <Navbar /> */}
                    <div className="uploader position-absolute top-50 start-50" style={{ transform: "translate(-50%, -50%)" }}>
                    <h1 className="text-center text-white display-3">Create A Post</h1>
                    <p className="text-center text-light">Select a type of post you wish to create...</p>
                        <div className="row gx-0">
                        <div className="col-12 mx-auto col-lg-6 p-2">
                            <Selector tileOptions={tileOptions} active={active} setActive={setActive} />
                            <div className="border-1 br-10 p-3 bg-light">
                                {(active == tileOptions.IMAGE) && <ImagePostRenderer />}
                                {(active == tileOptions.TEXT) && <TextPostRenderer />}
                            </div>
                        </div>
                        </div>
                    </div>
                </ImagePostRendererContext.Provider>
            </PostContext.Provider>
        </div>
    );
}

export default memo(Post);