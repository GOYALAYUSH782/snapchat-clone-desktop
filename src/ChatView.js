import React, { useEffect } from 'react'
import './ChatView.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSelectedImage } from './features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {
  const history = useHistory();
  const selectedImage = useSelector(selectSelectedImage);

  const exit = () => {
    history.replace('/chats');
  };

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage, exit]);

  return (
    <div className='chatView'>
      <img src={selectedImage} onClick={exit} alt="" />
      <div className='chatView_timer'>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33]
          ]}
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
