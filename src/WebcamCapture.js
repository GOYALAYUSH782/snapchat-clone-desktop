import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css'; 

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user'
};

function WebcamCapture() {
  const webRef = useRef(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(
    () => {
      const imgSrc = webRef.current.getScreenshot();
      setImage(imgSrc);
      dispatch(setCameraImage(imgSrc));
      history.push('/preview');
    },
    [webRef],
  )
  return (
    <div className='webcamCapture'>
      <Webcam
        height={videoConstraints.height}
        audio={false}
        ref={webRef}
        screenshotFormat='image/jpeg'
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        className='webcamCapture_button'
        // fontSize='large'
        onClick={capture}
      />
      <img src={image} alt="" />
    </div>
  )
}

export default WebcamCapture
