import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Page1.css";

function Page1() {
    
    // Array of support messages
    const supportMessages = [
        "Let's try to turn that frown upside down.",
        "Every day is a fresh start.",
        "You are stronger than you think.",
        "Keep pushing forward.",
        "Take it one step at a time."
    ];

    const supportMessages2 = [
        "Meditate For 5 minutes",
        "Afternoon Walk or Workout",
        "10 Minutes of Mindful Reflection",
        "10 Minutes of Social Media Detox",
        "Make Bed",
    ]

    // State to hold the current support message
    const [currentSupportMessage, setCurrentSupportMessage] = useState('');
    const [currentSupportMessage2, setCurrentSupportMessage2] = useState('');
    const [currentSupportMessage3, setCurrentSupportMessage3] = useState('');
    const [currentSupportMessage4, setCurrentSupportMessage4] = useState('');
    // Function to select a random support message
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * supportMessages.length);
        setCurrentSupportMessage(supportMessages[randomIndex]);
    }, []); // The empty array ensures this effect runs only once when the component mounts

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * supportMessages2.length);
        setCurrentSupportMessage2(supportMessages2[randomIndex]);
    }, []);
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * supportMessages2.length);
        setCurrentSupportMessage3(supportMessages2[randomIndex]);
    }, []);
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * supportMessages2.length);
        setCurrentSupportMessage4(supportMessages2[randomIndex]);
    }, []);
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
            <el className = "message">1</el>
            <el className = "message">2</el>
            <li className="list-group-item">A fourth item</li>
            <el className = "message">4</el>
            <el className = "message">4</el>
            <li className="list-group-item">And a fifth one</li>
            <el className = "message">2</el>
            <el className = "message">1</el>
            </ul>
        </div>
    );
}

export default Page1;