import React from 'react'
import "./Chat.css"
import { Avatar } from '@mui/material'
import StopIcon from '@mui/icons-material/Stop';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

function Chat({ id,profilePic, username, timestamp, imageUrl, read}) {

    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const open = () =>{
        // if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).update(
                {read:true},
                {merge:true}
            );

            navigate('/chats/view')
        // }
    }
  return (
    <div onClick={open} className='chat'>
        <Avatar className='chat_avatar' src={profilePic} />
        <div className="chat_info">
            <h4>{username}</h4>
            {
                timestamp &&
                <p>
                    {!read && "Tap to view -"} {" "}
                    <ReactTimeago date={new Date(timestamp.toDate()).toUTCString()} /> 
                
                </p>
            }
            
        </div>

        {!read && <StopIcon className='chat_readIcon'/>}

    </div>
  )
}

export default Chat