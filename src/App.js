import React, {useEffect, lazy, Suspense} from 'react';
import './App.css';
import Login from "./Containers/Login/Login";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
// import Posts from "./Containers/Posts/Posts";
import * as actionCreators from "./Store/actionCreators";
import {useDispatch,} from "react-redux";


const Posts = lazy(() => import("./Containers/Posts/Posts"));

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionCreators.checkIsAuth());

    }, []);

    return (
        <div className="App">
            <Suspense fallback='/'>
                <Route path='/Posts' component={Posts}/>
                <Route path='/' exact component={Login}/>
                <Redirect to="/"/>
            </Suspense>
        </div>
    );
}

export default App;
