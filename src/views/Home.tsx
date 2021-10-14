import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./style/Home.css";
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Container fluid="xxl">
          <Row md={12}>
            <Col>
              {" "}
              <Link className="countries-link" to="/countries">
              🗺️Countries{" "}
              </Link>
            </Col>
            <Col>
              <Link className="slot-machine-link" to="/slot-machine">
                🎰Slot Machine
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
