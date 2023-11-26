import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Page1.css";

function Page1() {
    const navigate = useNavigate();
    
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
            <div className="help">
              <div>Affirmations</div>
              <div>Journalling</div>
              <div>Deep Breathing</div>
              <div>Goals</div>
              <div>Gratitude</div>
            </div>
        </div>
    );
}

export default Page1;