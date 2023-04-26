import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom"
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Login from './Login';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            {/* <Header /> */}
            <img src="Snapchat.png" alt="" className='app_logo' />
            <div className="app_body">
              <div className="app_body_background">
                <Routes>

                  <Route path="/chats/view" element={<ChatView />} />

                  <Route path="/chats" element={<Chats />} />

                  <Route path="/preview" element={<Preview />} />

                  <Route path="/" element={<WebcamCapture />} />

                </Routes>
              </div>


            </div>


          </>
        )}

      </Router>

    </div>
  );
}

export default App;
