import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./style/SlotMachine.css";
import {
  getRandomNumber,
  slotMachineRewardRules,
  convertFruitTextToEmoji,
} from "../helpers";
import { SLOT_MACHINE } from "../config";

const SlotMachine = () => {
  const [reels, setReels] = useState({
    reel1: SLOT_MACHINE.reel1[0],
    reel2: SLOT_MACHINE.reel2[0],
    reel3: SLOT_MACHINE.reel3[0],
  });
  const [coins, setCoins] = useState(20);

  const [gainCoins, setGainCoins] = useState(0);

  const spin = () => {
    setCoins((prevState: any) => prevState - 1);
    setReels({
      reel1: SLOT_MACHINE.reel1[getRandomNumber(0, SLOT_MACHINE.reel1.length)],
      reel2: SLOT_MACHINE.reel2[getRandomNumber(0, SLOT_MACHINE.reel2.length)],
      reel3: SLOT_MACHINE.reel3[getRandomNumber(0, SLOT_MACHINE.reel3.length)],
    });
    const rewardsCoins = slotMachineRewardRules(reels);
    setGainCoins(rewardsCoins);
    setCoins((prevState: any) => prevState + rewardsCoins);
  };

  return (
    <div>
      <div className="coins-container">
        <span>{coins}</span>
      </div>
      {coins === 0 && <span>You dont have more coins</span>}
      <div className="slot-machine-container">
        <span>{convertFruitTextToEmoji(reels.reel1)}</span>
        <span>{convertFruitTextToEmoji(reels.reel2)}</span>
        <span>{convertFruitTextToEmoji(reels.reel3)}</span>
      </div>
      <div className="slot-machine-btn-container">
        <Button disabled={coins === 0} onClick={spin}>
          Spin
        </Button>
      </div>
    </div>
  );
};

export default SlotMachine;
