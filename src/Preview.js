import React, { useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import "./Preview.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectCameraImage, resetCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { storage, db } from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/appSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");
    uploadTask.on('state_changed',
      null,
      err => {
        // ERROR functiion
        console.log(err)
      },
      () => {
        // COMPLETE function
        storage
          .ref(`posts/${id}`)
          .getDownloadURL()
          .then(url => {
            db.collection('posts').add({
              imageUrl: url,
              read: false,
              username: user.username,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            history.replace('/chats');
          })
      })
  };

  return (
    <div className='preview'>
      <CloseIcon className='preview_close' onClick={closePreview} />
      <div className='preview_toolbarRight'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className='preview_footer'>
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className='preview_sendIcon' />
      </div>
    </div>
  )
}

export default Preview
