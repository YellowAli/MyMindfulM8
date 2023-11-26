import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Page1.css";

function Page2() {
    
    // Array of support messages
    const supportMessages = [
        "Let's try to turn that frown upside down.",
        "Every day is a fresh start.",
        "You are stronger than you think.",
        "Keep pushing forward.",
        "Take it one step at a time."
        // Add more messages as you see fit
    ];

    // State to hold the current support message
    const [currentSupportMessage, setCurrentSupportMessage] = useState('');

    // Function to select a random support message
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * supportMessages.length);
        setCurrentSupportMessage(supportMessages[randomIndex]);
    }, []); // The empty array ensures this effect runs only once when the component mounts

    return (
        <div className="container">
            <div className="header-container">Your current focus is:</div>
            <div className="focus-container">
                <div className="focus">Mental health</div>
            </div>
            <div className="icon-container">
                <div className="heart-icon"></div>
            </div>
            <div className="support">{currentSupportMessage}</div>
            <ul className="list-group">
            <li className="list-group-item">An item</li>
            <el className = "message">2</el>
            <el className = "message">1</el>
            <li className="list-group-item">A second item</li>
            <el className = "message">3</el>
            <el className = "message">2</el>
            <li className="list-group-item">A third item</li>
            <el className = "mesage">1</el>
            <el className = "mesage">2</el>
            <li className="list-group-item">A fourth item</li>
            <el className = "mesage">4</el>
            <el className = "mesage">4</el>
            <li className="list-group-item2">And a fifth one</li>
            <el className = "mesage">2</el>
            <el className = "mesage">1</el>
            </ul>
        </div>
    );
}

export default Page2;