import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }));
      } else {
        dispatch(logout());
      }
    })
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ?
          <Login /> :
          <>
            <img src='https://www.snapchat.com/global/social-lg.jpg' className='app_logo' />
            <div className="app_body">
              <div className='app_background'>
                <Switch>
                  <Route path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route path="/chats">
                    <Chats />
                  </Route>
                  <Route path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        }
      </Router>
    </div>
  );
}

export default App;
