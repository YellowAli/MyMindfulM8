import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Page2.css";

function Page2() {
    const navigate = useNavigate();
    
    // Array of support messages
    const supportMessages5 = [
        "Let's try to turn that frown upside down.",
        "Every day is a fresh start.",
        "You are stronger than you think.",
        "Keep pushing forward.",
        "Take it one step at a time."
    ];

    // State to hold the current support message
    const [currentSupportMessage5, setCurrentSupportMessage5] = useState('');
    // Function to select a random support message
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * supportMessages5.length);
        setCurrentSupportMessage5(supportMessages5[randomIndex]);
    }, []); // The empty array ensures this effect runs only once when the component mounts
    return (
        <div className="container2">
            <div className="header-container2">Your current focus is:</div>
            <div className="focus-container2">
                <div className="focus2">Social health</div>
            </div>
            <div className="icon-container2">
                <div className="heart-icon2"></div>
            </div>
            <div className="support2">{currentSupportMessage5}</div>
            <ul className="list-group2">
            <li className="list-group-item2">Kindness</li>
            <el className = "message2">Kindness has been linked to enhanced social relationships and increased feelings of social support, promoting a sense of belonging and reducing feelings of isolation. </el>
            <li className="list-group-item2">Call A Friend</li>
            <el className = "message2">Calling a friend can reinforce social bonds and provide a sense of connection, which is crucial for social well-being and combating loneliness.</el>
            <li className="list-group-item2">Volunteer</li>
            <el className = "message2">Volunteering is associated with a stronger sense of community, improved empathy, and heightened feelings of social contribution, fostering a network of mutual aid and support.</el>
            <li className="list-group-item2">Digital Detox</li>
            <el className = "message2">A digital detox can lead to improved face-to-face interactions and presence, allowing for deeper social engagements and reducing the sense of social fatigue.</el>
            <li className="list-group-item2">Family Time</li>
            <el class="message2">Family time is vital for reinforcing personal bonds, offering emotional support, and creating a shared sense of identity and belonging within one's social sphere.</el>
            </ul>
            <button className="btn22" onClick={() => navigate('/home')}>Home</button>
            <button className="btn222" onClick={() => navigate('/login')}>Log Out</button>
        </div>
    );
}

export default Page2;