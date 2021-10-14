import React from "react";
import { Link } from "react-router-dom";
import "./style/Home.css";
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Link className="countries-link" to="/countries">
          Countries🗺️{" "}
        </Link>
        <span className="home-line-div"></span>
        <Link className="slot-machine-link" to="/slot-machine">
          🎰Slot Machine
        </Link>
      </div>
    </div>
  );
};

export default Home;
