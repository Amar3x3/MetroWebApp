import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const PlatformEdge = () => {
    const [loading, setLoading] = useState(false);
    const [videoStream, setVideoStream] = useState('');
  
    useEffect(() => {
      const fetchVideoStream = async () => {
        try {
          const response = axios.get('http://127.0.0.1:5000/video_feed/platform');
          console.log(response.data)
          if (response) {
            setVideoStream('http://127.0.0.1:5000/video_feed/platform');
            setLoading(false);
          } 
        } catch (error) {
          console.error('Error fetching video stream:', error);
          setLoading(true);
        }
      };
      fetchVideoStream();
    }, []);
  
    return (
      <div className='video-cont'>
        <h1>platform</h1>
        <div>
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              <h2>Video Stream</h2>
               <img src='http://127.0.0.1:5000/video_feed/platform' alt="Video Stream" />
            </>
          )}
        </div>
      </div>
    );
}
export default PlatformEdge;