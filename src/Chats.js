import React, { useState, useEffect } from 'react'
import './Chats.css';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { db, auth } from './firebase';
import Chat from './Chat';
import { selectUser } from './features/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
      )

  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push('/');
  }

  return (
    <div className='chats'>
      <div className='chats_header'>
        <Avatar src={user.profilePic} className='chats_avatar' onClick={() => auth.signOut()} />
        <div className='chats_search '>
          <SearchIcon className='chats_searchIcon' />
          <input placeholder='Friends' type='text' />
        </div>
        <ChatBubbleIcon className='chats_chatsIcon' />
      </div>
      <div className='chats_posts'>
        {posts.map(({ id, data: { imageUrl, read, username, timestamp, profilePic } }) => (
          <Chat
            key={id}
            id={id}
            imageUrl={imageUrl}
            username={username}
            timestamp={timestamp}
            profilePic={profilePic}
            read={read}
          />
        ))}
      </div>
      <RadioButtonUncheckedIcon
        className='chats_takePicIcon'
        fontSize='large'
        onClick={takeSnap}
      />
    </div>
  )
}

export default Chats
