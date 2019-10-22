import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post/Post";
import './Posts.css';
import * as actionCreators from "../../Store/actionCreators";
import Spinner from "../../Components/UI/Spinner/Spinner";

const Posts = (props) => {

    const isAuth = useSelector(state => state.isAuth);
    const err = useSelector(state => state.err);
    const userPosts = useSelector(state => state.userPosts);
    const allPosts = useSelector(state => state.posts) ;
    const [HideState, setHideState] = useState("hide");

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuth) {
            props.history.push('/')
        }
    }, [isAuth]);


    useEffect(() => {

        dispatch(actionCreators.getPosts())

    }, []);

    let posts = <Spinner/>;

    if (Array.isArray(allPosts)){
    console.log('test', allPosts[0]);}

    if ( Array.isArray(allPosts) ){
        posts = allPosts.map(p => {
            return <Post
                key={p.id}
                name={p.name}
                clicked={() => postClickHandler(p.id)}
                email={p.email}
                class="post"
            />
        });

    }

    if (err){
        posts = err
    }

    let  onePost = <Spinner/>;

    const postClickHandler = (id)=>{
       setHideState("onePost");
       dispatch(actionCreators.getOnePost(id));
    };


    if (userPosts){
        onePost = <Post name={userPosts.title}
                email={userPosts.body}
        />
    }

    return (
        <React.Fragment>
            <div className="allPosts">
            <ul>
                {posts}
            </ul>
            </div>
            <div className={HideState}>
                <ul>
                    {onePost}
                </ul>
            </div>
        </React.Fragment>
    );
};


export default Posts;
