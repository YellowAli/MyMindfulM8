import React from "react";
import "../styles/Home.css";
import image from "../Images/Group-716-1.png";
import image2 from "../Images/healthy-fitness-girl-doing-aerobics-in-the-gym-illustration-in-doodle-style-png.png";
import image3 from "../Images/happy-friends-posing-together-png.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home({setIsAuthenticated}) {
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

  return (
    <>
      <div className="header">
        <h1>Welcome Back</h1>
      </div>

      <div className="Card1-Container">
        <div className="Card1">
          <img src={image} className="card-img-top" alt="Card 1" />
          <div className="card-body">
            <h3 className="card-title">Mental Health</h3>
          </div>
          <p className="card-text">
            Prioritizing mental health is essential for overall well-being, as
            it significantly influences our thoughts, emotions, and
            behaviors,impacting our ability to lead fulfilling lives.
          </p>
          <button
            className="MentalHealthLink"
            onClick={() => navigate("/mental")}
          >
            Start your Journey
          </button>
        </div>

        <div className="Card2">
          <img src={image2} className="card-img-top" alt="Card 2" />
          <div className="card-body">
            <h3 className="card-title">Physical Health</h3>
            <p className="card-text">
              "Taking care of your body is key for a happy life. It gives you
              energy helps you bounce back from challenges, and lets you make
              the most out of every day."
            </p>
            <button
              className="PhysicalHealthLink"
              onClick={() => navigate("/physical")}
            >
              Start your Journey
            </button>
          </div>
        </div>

        <div className="Card3">
          <img src={image3} className="card-img-top" alt="Card 2" />
          <div className="card-body">
            <h3 className="card-title">Social Health</h3>
            <p className="card-text">
              "Cultivating a social life adds joy and connection to your
              journey. It's the heart of memorable moments, support in tough
              times, and the essence of a well-rounded, fulfilling life."
            </p>
            <button
              className="SocialHealthLink"
              onClick={() => navigate("/social")}
            >
              Start your Journey
            </button>
          </div>
        </div>
      </div>
      <div className="logout">
        <button className="Logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Home;
