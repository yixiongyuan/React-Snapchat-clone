import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import {useNavigate } from 'react-router-dom'
import './WebcamCapture.css'

const videoConstarints = {
    width:250,
    height:400,
    facingMode:"user",
};

function WebcamCapture() {

    const webcamRef = useRef(null)
    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const [image,setImage] = useState(null)

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();

        dispatch(setCameraImage(imageSrc))
        navigate('/preview')
        
    },[webcamRef])

  return (
    <div className='webcamCpature'>
        <Webcam 
            audio={false}
            // height={videoConstarints.height}
            // width={videoConstarints.width}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstarints}
            
        />

        <RadioButtonUncheckedIcon
            className='webcamCapture_button'
            onClick = {capture}
            fontSize='large'
        />

        <img src={image} alt="" />
    </div>
  )
}

export default WebcamCapture