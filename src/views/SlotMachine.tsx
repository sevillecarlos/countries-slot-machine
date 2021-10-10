import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./style/SlotMachine.css";
import { getRandomNumber } from "../helpers/getRandomNumber";
import { SLOTMACHINE } from "../config";

const SlotMachine = () => {
  const [reelNumber, setReelNumber] = useState({
    reelNumber1: 0,
    reelNumber2: 0,
    reelNumber3: 0,
  });

  const spin = () => {
    setReelNumber({
      reelNumber1: getRandomNumber(0, SLOTMACHINE.reel1.length),
      reelNumber2: getRandomNumber(0, SLOTMACHINE.reel2.length),
      reelNumber3: getRandomNumber(0, SLOTMACHINE.reel3.length),
    });
  };

  console.log(reelNumber)
  return (
    <div>
      <div className="slot-machine-container">
        <span>{SLOTMACHINE.reel1[reelNumber.reelNumber1]}</span>
        <span>{SLOTMACHINE.reel2[reelNumber.reelNumber2]}</span>
        <span>{SLOTMACHINE.reel3[reelNumber.reelNumber3]}</span>
      </div>
      <div className="slot-machine-btn-container">
        <Button onClick={spin}>Spin</Button>
      </div>
    </div>
  );
};

export default SlotMachine;
