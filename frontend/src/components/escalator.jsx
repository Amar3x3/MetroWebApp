import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Escalator = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  

  return (
    <div className='video-cont'>
      <h1>Escalator</h1>
      <div>
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            <h2>Video Stream</h2>
            <video ref={videoRef} controls autoPlay />
          </>
        )}
      </div>
    </div>
  );
};

export default Escalator;
