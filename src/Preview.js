import React, { useEffect } from 'react'
import "./Preview.css"
import { useDispatch, useSelector } from 'react-redux'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import { useNavigate } from 'react-router-dom';
import { db, storage } from './firebase';
import { ref,uploadString,getDownloadURL  } from 'firebase/storage';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer'; import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from "uuid";
import firebase from 'firebase/compat';

function Preview() {

  const cameraImage = useSelector(selectCameraImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cameraImage) {
      navigate('/', { replace: true })
    }
  }, [cameraImage, navigate])

  const closePreview = () => {
    dispatch(resetCameraImage())
    navigate('/', { replace: true })
  }

  const sendPost = () => {

    const id = uuid();
    const storageRef = ref(storage,`posts/${id}`);
    uploadString(storageRef,cameraImage, "data_url")
      .catch((error) => {console.log(error)})
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url)=>{
            db.collection('posts').add({
              imageUrl:url,
              username:'Minatozaki Sana',
              read:false,
              //profile
              timestamp:firebase.firestore.FieldValue.serverTimestamp()
            });
            navigate('/chats', { replace: true })
          });
      });
  }

  return (
    <div className='preview'>
      <CloseIcon
        className='preview_close'
        onClick={closePreview}
      />
      <div className="previwe_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div className="preview_footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <SendIcon
          fontSize='small'
          className='preview_sendIcon'
        />
      </div>
    </div>
  )
}

export default Preview