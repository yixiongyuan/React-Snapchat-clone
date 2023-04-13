import React, { useEffect } from 'react'
import './ChatView.css'
import { useSelector } from 'react-redux'
import { selectSelectedImage } from './features/appSlice'
import { useNavigate } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {

    const selectedImage = useSelector(selectSelectedImage);
    const navigate = useNavigate();

    useEffect(() => {

        if (!selectedImage) {
            exit();
        }

    }, [selectedImage])

    const exit = () => {
        navigate('/chats', { replace: true })
    }

    return (
        <div className='chatView'>
            <img src={selectedImage} onClick={exit} alt="" />
            <div className="chatView_timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit();
                        }
                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>

        </div>
    )
}

export default ChatView