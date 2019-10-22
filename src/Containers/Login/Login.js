import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import './Login.css';
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actionCreators from '../../Store/actionCreators';


const Login = (props) => {

    const [controlsState, setControlsState] = useState({
        userName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your User Name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false
        },
        submit: {
            elementType: 'submit',
            elementConfig: {
                type: 'submit',
            },
            value: 'Submit',

            valid: false,
            touched: false
        },
    });
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.isLoading);
    const err = useSelector(state => state.err);
    const isAuth = useSelector(state => state.isAuth);
    let error;
    let form;

    useEffect(() => {
        if (isAuth) {
            props.history.push('/Posts')
        }
    }, [isAuth]);


    const inputChangedHandler = (event, id) => {
        const xState = {
            ...controlsState,
            [id]: {
                ...controlsState[id],
                value: event.target.value,
                touched: true,
                valid: event.target.value.length >= controlsState[id].validation.minLength
            }
        };

        setControlsState(xState);

    };


    const authHandler = (event) => {
        event.preventDefault();
        dispatch(actionCreators.auth(controlsState.userName.value, controlsState.password.value));
    };

    // error MSG
    if (err) {
        error = <p className="err">
            {err}
        </p>
    }

    let formElementArray = [];
    for (let key in controlsState) {
        formElementArray.push({
            id: key,
            config: controlsState[key]
        });
    }


    if (isLoading) {
        form = <Spinner/>;
    } else {
        form = formElementArray.map((formE) => {
            return <input
                value={props.value}
                {...formE.config.elementConfig}
                {...formE.config.validation}
                required={formE.config.validation}
                onChange={(event) => inputChangedHandler(event, formE.id)}
                key={formE.id}
            />;
        });
    }


    return (
        <div>
            <form className="box" onSubmit={authHandler}>
                <h1> Login </h1>
                {error}
                {form}
            </form>
        </div>
    );
};


export default Login;
