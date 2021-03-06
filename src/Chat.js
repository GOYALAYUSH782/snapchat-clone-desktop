import React from 'react'
import './Chat.css';
import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { db } from './firebase';
import { useHistory } from 'react-router-dom';

function Chat({ imageUrl, read, username, timestamp, profilePic, id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection('posts').doc(id).set(
        {
          read: true
        }, { merge: true });
      history.push('/chats/view');
    }
  }
  return (
    <div onClick={open} className='chat'>
      <Avatar src={profilePic} className='chat_avatar' />
      <div className='chat_info'>
        <h4>{username}</h4>
        <p>{!read && 'Tap to view -'} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
      </div>
      {!read && <StopRoundedIcon className='chat_readIcon ' />}
    </div>
  )
}

export default Chat
