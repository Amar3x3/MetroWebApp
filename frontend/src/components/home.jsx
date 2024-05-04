import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Escalator from './escalator';
import LostBaggage from './lostBaggage';
import PlatformEdge from './platformEdge';
import TicketQueue from './ticketQueue';
import axios from 'axios';


const Home = () => {
    const [tab, setTab] = useState('E');
    const handleTabSwitch = (value) =>{
        setTab(value)
    }
    const [file, setFile] = useState(null);
    const [type,setType] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type',type)

        try {
            const res = await axios.post('http://127.0.0.1:5000/video_feed/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(()=>{
        
    },[tab])
    return (
        <>
        <div>
            <input type="file" name="Upload" id="" onChange={handleFileChange} />
            <select name="" id="" onChange={handleTypeChange}>
                <option value="">Select</option>
                <option value="Platform">Platform</option>
                <option value="Queue">Queue</option>
                <option value="Abandon">Abandon</option>
            </select>
            <button onClick={handleUpload}>Upload</button>

            {uploadProgress}

        </div>
            <div className="tabs-grid-container">
                <div onClick={()=>handleTabSwitch('E')} className="tab">Escalator</div>
                <div onClick={()=>handleTabSwitch('L')} className="tab">Lost Baggage</div>
                <div onClick={()=>handleTabSwitch('P')} className="tab">Platform Edge</div>
                <div onClick={()=>handleTabSwitch('T')} className="tab">Ticket Queue</div>
            </div>

            <div className="video-cont">
                {tab && tab === 'E' && (<Escalator></Escalator>)}
                {tab && tab === 'L' && (<LostBaggage></LostBaggage>)}
                {tab && tab === 'P' && (<PlatformEdge></PlatformEdge>)}
                {tab && tab === 'T' && (<TicketQueue></TicketQueue>)}
            </div>



        </>
    )
}
export default Home;