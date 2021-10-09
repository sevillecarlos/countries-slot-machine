import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./style/Home.css";
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Router>
          <span className="countries-container">
            {/* <span className="earth"></span> */}

            <Link className="countries" to="/countries">
              Countries
            </Link>
          </span>
          <span className="slot-machine-container">
            <Link className="slot-machine" to="/slot-machine">
              Slot Machine
            </Link>
          </span>
        </Router>
      </div>
    </div>
  );
};

export default Home;
