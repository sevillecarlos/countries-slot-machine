import React from "react";
import Routes from "./routes";
import { Navbar, Container } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar className="app-nav-bar">
        <Container>
          <Navbar.Brand>
            <span className="countries-title-brand">Countries</span>&{" "}
            <span className="slot-machine-title-brand">Slot Machine</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
