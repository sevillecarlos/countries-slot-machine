import React from "react";
import { Button } from "react-bootstrap";
import "./style/SlotMachine.css";
import { SLOTMACHINE } from "../config";

const SlotMachine = () => {
  return (
    <div>
      <div className="slot-machine-container">
        <span>{SLOTMACHINE.reel1[0]}</span>
        <span>{SLOTMACHINE.reel2[0]}</span>
        <span>{SLOTMACHINE.reel3[0]}</span>
      </div>
      <div className="slot-machine-btn-container">
        <Button>Spin</Button>
      </div>
    </div>
  );
};

export default SlotMachine;
