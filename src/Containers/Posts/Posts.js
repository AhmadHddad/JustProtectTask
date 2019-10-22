import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import Post from "./Post/Post";
import './Posts.css';
import * as actionCreators from "../../Store/actionCreators";
import Spinner from "../../Components/UI/Spinner/Spinner";

const Posts = (props) => {


    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.isAuth);
    const err = useSelector(state => state.err);
    const userPosts = useSelector(state => state.userPosts);
    const allPosts = useSelector(state => state.posts);
    const [HideState, setHideState] = useState("hide");
    let onePost = err || <Spinner/>;
    let posts = err || <Spinner/>;


    useEffect(() => {
        if (!isAuth) {
            props.history.push('/')
        }
        dispatch(actionCreators.getPosts())

    }, [isAuth]);


    const postClickHandler = (id) => {
        setHideState("onePost");
        dispatch(actionCreators.getOnePost(id));
    };


    if (err) {
        posts = err;
    }


    if (typeof (userPosts) == "object" && userPosts) {
        onePost = <Post name={userPosts.title}
                        email={userPosts.body}
        />
    }


    if (Array.isArray(allPosts)) {
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
