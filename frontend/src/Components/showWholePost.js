import { memo, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';


function Comment(props){
    return(
        <>
            <b>props</b>
        </>
    );
}

function ShowWholePost(props) {
   console.log(props);
        // if(!props.show)
        // {
        //     return null;
        // }
        return (
             <Modal aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Container>
                    <Row>
                    <Col md={6}>
                        {/* <img alt="" src={`http://localhost:4000/static/posts/${props.post.content.url}`} className="image-post"  /> */}
                    </Col>
                    <Col md={6}>
                        <Row>
                            {/* {props.post.comments.map((ele)=>)} */}
                        </Row>
                    </Col>
                    </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        
        );
    }


export default memo(ShowWholePost);