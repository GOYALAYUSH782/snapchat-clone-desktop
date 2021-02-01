import React from 'react'
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';

function Login() {
  const dispatch = useDispatch();

  const singIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch(login({
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          id: result.user.uid
        }))
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className='login'>
      <div className='login_container'>
        <img src='https://www.snapchat.com/global/social-lg.jpg' />
        <Button variant='outlined' className='signIn_button' onClick={singIn}>Sign In</Button>
      </div>
    </div>
  )
}

export default Login
