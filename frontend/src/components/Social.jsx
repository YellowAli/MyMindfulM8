import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages.css";
import axios from "axios";

function Social({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/logout");

      if (response.status == 200) {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Array of support messages
  const supportMessages = [
    "Let's try to turn that frown upside down.",
    "Every day is a fresh start.",
    "You are stronger than you think.",
    "Keep pushing forward.",
    "Take it one step at a time.",
  ];

  const supportMessages2 = [
    "Meditate For 5 minutes",
    "Afternoon Walk or Workout",
    "10 Minutes of Mindful Reflection",
    "10 Minutes of Social Media Detox",
    "Make Bed",
  ];

  const supportMessages3 = [
    "Meditate For 5 minutes",
    "Afternoon Walk or Workout",
    "10 Minutes of Mindful Reflection",
    "10 Minutes of Social Media Detox",
    "Make Bed",
  ];

  const supportMessages4 = [
    "Meditate For 5 minutes",
    "Afternoon Walk or Workout",
    "10 Minutes of Mindful Reflection",
    "10 Minutes of Social Media Detox",
    "Make Bed",
  ];

  // State to hold the current support message
  const [currentSupportMessage, setCurrentSupportMessage] = useState("");
  const [currentSupportMessage2, setCurrentSupportMessage2] = useState("");
  const [currentSupportMessage3, setCurrentSupportMessage3] = useState("");
  const [currentSupportMessage4, setCurrentSupportMessage4] = useState("");
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
    setCurrentSupportMessage3(supportMessages3[randomIndex]);
  }, []);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * supportMessages2.length);
    setCurrentSupportMessage4(supportMessages4[randomIndex]);
  }, []);
  return (
    <div className="container">
      <div className="header-container">
        Your Current Focus is: <br />
        Social health
      </div>
      <div className="icon-container">
        <div className="heart-icon"></div>
      </div>
      <div className="support">{currentSupportMessage}</div>

      <div className="real-container">
        <div className="line-container">
          <div className="Affirmations">
            <div className="card-body">
              <h3 className="card-title">Kindness</h3>
              <p className="card-text">
                "Kindness has been linked to enhanced social relationships and
                increased feelings of social support, promoting a sense of
                belonging and reducing feelings of isolation. "
              </p>
            </div>
          </div>

          <div className="Journaling ">
            <div className="card-body">
              <h3 className="card-title">Call A Friend</h3>
              <p className="card-text">
                "Calling a friend can reinforce social bonds and provide a sense
                of connection, which is crucial for social well-being and
                combating loneliness. "
              </p>
            </div>
          </div>
        </div>

        <div className="line-container">
          <div className="DeepBreathing">
            <div className="card-body">
              <h3 className="card-title">Volunteer</h3>
              <p className="card-text">
                "Volunteering is associated with a stronger sense of community,
                improved empathy, and heightened feelings of social
                contribution, fostering a network of mutual aid and support. "
              </p>
            </div>
          </div>

          <div className="Gratitude">
            <div className="card-body">
              <h3 className="card-title">Digital-Detox</h3>
              <p className="card-text">
                "A digital detox can lead to improved face-to-face interactions
                and presence, allowing for deeper social engagements and
                reducing the sense of social fatigue. "
              </p>
            </div>
          </div>
        </div>

        <div className="checkboxes">
          <div>
            <input type="checkbox" id="goal1" name="goal1" />
            <label for="goal1">{currentSupportMessage2}</label>
          </div>
          <div>
            <input type="checkbox" id="goal2" name="goal2" />
            <label for="goal2">{currentSupportMessage3}</label>
          </div>
          <div>
            <input type="checkbox" id="goal3" name="goal3" />
            <label for="goal3">{currentSupportMessage4}</label>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="btn11" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="btn111" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Social;
