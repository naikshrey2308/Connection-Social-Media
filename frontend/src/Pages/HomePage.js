// import Navbar from "../Components/Navbar";
import PostBlock from "../Components/PostBlock";

import { memo, useEffect,useState } from "react";
import ShowWholePost from "../Components/showWholePost";

function HomePage() {

    const [commonObject_, setCommonObject_]= useState([]);
    const [AllPosts, setAllPosts]= useState(null);
    const [modalShow , setmodalShow] = useState(false);

    useEffect(() => {
        (async function(){
            const req = await fetch('/user/getFollowersFollowing',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({emailSession:window.sessionStorage.getItem('email')}),
            });
            const res = await req.json();
            setCommonObject_(res.result);
            
            // console.log("inside function....");

            var posts = [];
            for(var i of res.result){
                const username = i.username;
                // console.log(`/posts/imageForShow/${username}`);
                const req_ = await fetch(`/posts/imageForShow/${username}`,{
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });
                
                const res_ = await req_.json();
                // console.log(res_.result);
                posts = posts.concat(res_.result);
            }
            // posts.sort((a,b)=>{return 0.5 - Math.random();})
            if(posts){
                setAllPosts(posts);
                console.log(posts);
                console.log(AllPosts);
            }
            
        })();
    }, []);

    const [postForModal,setPostForModal]= useState({});

    function modalShow_(post){
        console.log("inside modal show");
        setmodalShow(true);
        setPostForModal(post);
    }

    return(
        <div style={{marginTop:4+'em'}}>
            { AllPosts && <>

               { AllPosts.map(value => {
                //  console.log(value);
                 return <PostBlock postObj={value} modalShow={modalShow_}/>
               }) }

               <ShowWholePost show={true} onHide={() => setmodalShow(false)} post={postForModal} />

            </>}
        </div>
    );
}
export default memo(HomePage);