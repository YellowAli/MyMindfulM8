import React from "react";
import "../styles/Home.css";
import image from "../Images/img.png";

function Home() {
  return (
    <>
      <div className="header">
        <h1>Welcome back, What would you like to Work on Today</h1>
      </div>

      <div className="Card1-Container">
        <div className="Card1">
          <img src={image} className="card-img-top" alt="Card 1" />
          <div className="card-body">
            <h3 className="card-title">Mental Health</h3>
            <p className="card-text">
              Prioritizing mental health is essential for overall well-being,
              <br /> as it significantly influences our thoughts, emotions, and
              behaviors,
              <br /> impacting our ability to lead fulfilling lives.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>

        <div className="Card2">
          <img src="../Images/img.png" className="card-img-top" alt="Card 2" />
          <div className="card-body">
            <h3 className="card-title">Mental Health</h3>
            <p className="card-text">
              Prioritizing mental health is essential for overall well-being,
              <br /> as it significantly influences our thoughts, emotions, and
              behaviors,
              <br /> impacting our ability to lead fulfilling lives.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>

        <div className="Card3">
          <img src="../Images/img.png" className="card-img-top" alt="Card 2" />
          <div className="card-body">
            <h3 className="card-title">Mental Health</h3>
            <p className="card-text">
              Prioritizing mental health is essential for overall well-being,
              <br /> as it significantly influences our thoughts, emotions, and
              behaviors,
              <br /> impacting our ability to lead fulfilling lives.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
