import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Escalator from './escalator';
import LostBaggage from './lostBaggage';
import PlatformEdge from './platformEdge';
import TicketQueue from './ticketQueue';


const Home = () => {
    const [tab, setTab] = useState('E');
    const handleTabSwitch = (value) =>{
        setTab(value)
    }
    useEffect(()=>{
        
    },[tab])
    return (
        <>
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