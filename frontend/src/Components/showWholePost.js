import { memo, useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { MdCheck } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import '../styles/modal.css';
// function Comment(props){
//     console.log(props.content);
//     return(

//     );
// }

function ShowWholePost(props) {

    const [btnState, setBtnState] = useState(false);
    const [postComments, setPostComments] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likesLength, setLikesLength] = useState(0);

    useEffect(() => {
        if (props.post.likes) {
            setLiked(props.post.likes.indexOf(window.sessionStorage.getItem("username")) != -1);
            setLikesLength(props.post.likes.length);
        }
    }, [props.show, postComments]);

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
            setLiked(true);
            setLikesLength(likesLength + 1);
        }
    }

    if (!props.show) {
        return null;
    } else {
        // setLiked(props.post.likes.inde);
    }
    console.log(props.post.likes);

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered size="lg">
            <Modal.Header closeButton style={{ paddingBottom: 0 }}>
                <div className="row">
                    <div className="col-4">
                        <img alt="" src={`http://localhost:4000/static/profilePics/${props.post.profilePic}`} className="mx-4 border" width={30} height={30} style={{ borderRadius: "50%" }} />
                    </div>
                    <div className="col my-2">
                        <h6>{props.post.name}</h6>

                    </div>

                </div>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container >
                    <Row>
                        <Col md={6} className="position-relative text-center">
                            <img alt="" src={`http://localhost:4000/static/posts/${props.post.content.url}`} className="image-post" />
                            {(props.showLike) &&
                                <Row className="bottom-0 bg-white w-100 p-3 position-absolute">
                                    <Col className="col-3">
                                        <div>
                                            {likesLength}&nbsp;Likes
                                        </div>
                                    </Col>
                                    <Col className="col"></Col>
                                    <Col className="col-3 text-start me-4">
                                        {/* <AiOutlineHeart style={{cursor: "pointer"}} size={25} /> */}
                                        {!(liked) && <AiOutlineHeart color="black" size={25} onClick={clickLike} style={{ cursor: 'pointer' }}></AiOutlineHeart>}
                                        {(liked) && <AiFillHeart color="red" size={25} onClick={clickLike} ></AiFillHeart>}
                                    </Col>
                                </Row>
                            }
                        </Col>
                        <Col md={6} className="position-relative">
                            {
                                (props.post.content && props.post.content.caption) &&
                                <Row>
                                    <p>
                                        <b>{props.post.username}</b>&nbsp;
                                        <span dangerouslySetInnerHTML={{__html: props.post.content.caption}}></span>    
                                    </p>
                                    <hr/>
                                </Row>
                            }
                            <Row className="comments">
                                {(props.post.comments) && props.post.comments.map((ele) => <Row>
                                    <Row className="my-auto">
                                        <Col><b>{ele.person}</b>&nbsp;{ele.text}</Col>

                                    </Row>
                                </Row>)}
                            </Row>

                            <Row className="bottom-0 position-absolute">
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


export default memo(ShowWholePost);