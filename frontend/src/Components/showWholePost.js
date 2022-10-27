import { memo, useEffect,useState,useRef} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import '../styles/modal.css';
// function Comment(props){
//     console.log(props.content);
//     return(
        
//     );
// }

function ShowWholePost(props) {

    const [btnState,setBtnState] = useState(false);
    const [postComments, setPostComments] = useState(true);

    useEffect(() => {
        
    },[props.show, postComments]);

    const comment = useRef();

    function commentChange() {
        if(comment.current.value!==''){
            setBtnState(true);
        }
        else{
            setBtnState(false);
        }
    };

    function sendComment(){
        
        props.changecommentInUI({
            person : window.sessionStorage.getItem('username'),
            text : comment.current.value
        })

        console.log(comment.current.value);

        (async function(){
            const req = await fetch('/posts/addComment',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({post : props.post , text : comment.current.value ,person : window.sessionStorage.getItem('username')}),
            });
            const res = req.json();
            props.post.comments.push({
                person : window.sessionStorage.getItem('username'),
                text : comment.current.value
            });
            setPostComments(!postComments);
            // props.post.comments=postComments;
            comment.current.value = "";
        })();
    }

    if(!props.show)
    {
        return null;
    }
    console.log(props);

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered size="lg">
            <Modal.Header closeButton style={{paddingBottom:0}}>
                <div className="row">
                    <div className="col-4">
                        <img alt="" src={`http://localhost:4000/static/profilePics/${props.post.profilePic}`} className="mx-4 border" width={30} height={30} style={{borderRadius: "50%"}} />
                    </div>
                    <div className="col my-2">
                        <h6>{props.post.name}</h6>
                        
                    </div>
                    
                </div>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container >
                    <Row>
                        <Col md={6}>
                            <img alt="" src={`http://localhost:4000/static/posts/${props.post.content.url}`} className="image-post"  />
                        </Col>
                        <Col md={6}>
                            <Row className="comments">
                                {(props.post.comments) && props.post.comments.map((ele)=> <>
                                    <Row className="my-1">
                                        <Col md={5}><b>{ele.person}</b></Col>
                                        <Col>{ele.text}</Col>
                                    </Row>
                                </> )}
                            </Row>
                            
                            <Row style={{bottom:20,position:'absolute'}}>
                            <hr/>
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