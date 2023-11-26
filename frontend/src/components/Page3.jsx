import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Page2.css";
import axios from "axios";

function Page3({ setIsAuthenticated }) {
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
        Physical Health
      </div>
      <div className="icon-container">
        <div className="heart-icon"></div>
      </div>
      <div className="support">{currentSupportMessage}</div>

      <div className="real-container">
        <div className="line-container">
          <div className="Affirmations">
            <div className="card-body">
              <h3 className="card-title">Regular Exercise</h3>
              <p className="card-text">
                "Engage in activities like walking, running, or strength training to maintain a 
                healthy weight, strengthen muscles, and boost mood, promoting overall well-being."
              </p>
            </div>
          </div>

          <div className="Journaling">
            <div className="card-body">
              <h3 className="card-title">Balanced Nutrition</h3>
              <p className="card-text">
                "Consume a diverse, nutrient-rich diet with proteins, carbs, fats, and vitamins to 
                support energy levels, immune function, and achieve optimal health."
              </p>
            </div>
          </div>
        </div>

        <div className="line-container">
          <div className="DeepBreathing">
            <div className="card-body">
              <h3 className="card-title">Adequate Sleep</h3>
              <p className="card-text">
                "Aim for 7-9 hours of quality sleep per night to facilitate physical recovery, 
                enhance cognitive function, and promote overall health and vitality."
              </p>
            </div>
          </div>

          <div className="Gratitude">
            <div className="card-body">
              <h3 className="card-title">Stress Management</h3>
              <p className="card-text">
                "Practice stress-reducing activities like mindfulness or deep breathing to 
                maintain hormonal balance, improve mental health, and prevent stress-related health issues."
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
          </div>
      <button className="btn11" onClick={() => navigate("/home")}>
        Home
      </button>
      <button className="btn111" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Page3;