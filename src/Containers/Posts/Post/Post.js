import React from 'react'
import './Post.css';

const Post = (props) => {
    return (


     <React.Fragment>
         <div className={props.class} onClick={props.clicked}>
            <li>
            <h1>{props.name}</h1>
                <p>{props.email}</p>
            </li>
         </div>
     </React.Fragment>

    );
};


export default Post;
