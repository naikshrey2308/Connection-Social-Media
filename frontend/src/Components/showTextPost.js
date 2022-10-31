import { memo, useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import '../styles/modal.css';

function ShowTextPost(props) {

    const [btnState, setBtnState] = useState(false);
    const [postComments, setPostComments] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (props.post.likes) {
            setLikes(props.post.likes.length);
            setLiked(props.post.likes.includes(window.sessionStorage.getItem("username")));
        }
    }, [props.post]);

    const comment = useRef();

    function commentChange() {
        if (comment.current.value !== '') {
            setBtnState(true);
        }
        else {
            setBtnState(false);
        }
    };

    function sendComment() {

        props.changecommentInUI({
            person: window.sessionStorage.getItem('username'),
            text: comment.current.value
        })

        console.log(comment.current.value);

        (async function () {
            const req = await fetch('/posts/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ post: props.post, text: comment.current.value, person: window.sessionStorage.getItem('username') }),
            });
            const res = req.json();
            props.post.comments.push({
                person: window.sessionStorage.getItem('username'),
                text: comment.current.value
            });
            setPostComments(!postComments);
            // props.post.comments=postComments;
            comment.current.value = "";
        })();
    }

    async function clickLike() {
        const req = await fetch('/posts/likePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                owner: props.post.username,
                person: window.sessionStorage.getItem('username'),
                id: props.post.id
            }),
        });
        const res = await req.json();
        if (res.status == true) {
            setLikes(likes + 1);
            setLiked(true);
        }
    }

    if (!props.show) {
        return null;
    }
    console.log(props);

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered size="lg">
            <Modal.Header closeButton style={{ paddingBottom: 0 }}>
                <div className="row w-100 g-0">
                    <div className="col-1">
                        <img alt="" src={`http://localhost:4000/static/profilePics/${props.post.profilePic ?? "default_.png"}`} className="mx-4 border" width={30} height={30} style={{ borderRadius: "50%" }} />
                    </div>
                    <div className="col mx-3 my-2">
                        <h6>{props.post.name}</h6>
                    </div>
                    {
                        (props.showLike) &&
                        <div className="col-2 d-flex align-items-center">
                            <p>
                                {!(liked) && <AiOutlineHeart className="me-2" color="black" size={25} onClick={clickLike} style={{ cursor: 'pointer' }}></AiOutlineHeart>}
                                {(liked) && <AiFillHeart className="me-2" color="red" size={25} ></AiFillHeart>}
                                {likes} Likes
                            </p>
                        </div>
                    }
                </div>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container >
                    <Row>
                        <Col dangerouslySetInnerHTML={{ __html: props.post.content.text }} md={6} style={{ display: "inline-flex", wordWrap: 'break-all', wordBreak: "break-all", whiteSpace: "normal !important" }} className="textPost">

                        </Col>
                        <Col md={6}>
                            <Row className="comments">
                                {(props.post.comments) && props.post.comments.map((ele) => <>
                                    <Row className="my-auto">
                                        <Col><b>{ele.person}</b>&nbsp;{ele.text}</Col>

                                    </Row>
                                </>)}
                            </Row>

                            <Row className="bottom-0">
                                <hr />
                                <form className="d-flex" onSubmit={(e) => e.preventDefault()} >
                                    <input ref={comment} onChange={commentChange} type="text" className="input-control form-control px-3" placeholder="Comment Here" />
                                    <input disabled={!btnState} onClick={sendComment} type="submit" className="btn btn-base mx-3 px-4 py-2 postComment" value={"Post"} />
                                </form>
                            </Row>
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
        </Modal>

    );
}


export default memo(ShowTextPost);