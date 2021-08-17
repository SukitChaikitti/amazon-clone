import React , {useState} from 'react';
import './Login.css';
import {Link , useHistory} from 'react-router-dom';
import {auth} from './firebase';

function Login() {
    const history = useHistory();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const signinHandler = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
            .then((auth) => {
                history.push('/')
            }).catch((err) => {
                alert(err.message);
            })
    };

    const createHandler = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
            .then((auth) => {
                console.log(auth);
                history.push('/')
            }).catch((err) => {
                alert(err.message);
            })
    };

    return (
        <div className = 'login'>
            <Link to = '/'>
                <img className = 'login__logo' src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/>
            </Link>
            <div className = 'login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input value = {email} onChange = {e => setEmail(e.target.value)} type = 'text'/>
                    <h5>Password</h5>
                    <input value = {password} onChange = {e => setPassword(e.target.value)} type = 'password'/>
                    <button className = 'login__signin' onClick = {signinHandler}>Sign in</button>
                    <p>Don't have an account click the button below!!!</p>
                    <button className = 'login__create' onClick = {createHandler}>Create your Amazon account</button>
                </form>
            </div>
        </div>
    )
}

export default Login
