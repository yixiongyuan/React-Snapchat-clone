import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Login from './Login';
import Chats from './Chats';
import Chat from './Chat';
import ChatView from './ChatView';

function App() {
  return (
    <div className="app">
      <Router>
        {4>5 ? (
          <Login />
        ) : (
          <>
            {/* <Header /> */}
            <div className="app_body">
              {/* <Sidebar /> */}

              <Routes>

                <Route path="/chats/view" element={<ChatView />} />

                <Route path="/chats" element={<Chats />} />

                <Route path="/preview" element={<Preview />} />

                <Route path="/" element={<WebcamCapture />} />

              </Routes>
            </div>


          </>
        )}

      </Router>
      
    </div>
  );
}

export default App;
