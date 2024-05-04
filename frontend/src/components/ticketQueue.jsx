import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';


const TicketQueue = () => {
    const [loading, setLoading] = useState(false);
    const [videoStream, setVideoStream] = useState('');
  
    useEffect(() => {
      const fetchVideoStream = async () => {
        try {
          const response = axios.get('http://127.0.0.1:5000/video_feed/ticket');
          console.log(response.data)
          if (response) {
            setVideoStream('http://127.0.0.1:5000/video_feed/ticket');
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
        <h1>ticket</h1>
        <div>
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              <h2>Video Stream</h2>
               <img src='http://127.0.0.1:5000/video_feed/ticket' alt="Video Stream" />
            </>
          )}
        </div>
      </div>
    );
}
export default TicketQueue;