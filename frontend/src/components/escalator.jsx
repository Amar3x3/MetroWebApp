import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Escalator = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/video_feed/escalator');
        const streamUrl = URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));
        if (videoRef.current) { // Ensure videoRef is available before setting src
          videoRef.current.src = streamUrl;
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching video stream:', error);
        setLoading(true);
      }
    };

    fetchVideoStream();

    // Clean up function to revoke the object URL when the component unmounts
    return () => {
      if (videoRef.current) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, []);

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
