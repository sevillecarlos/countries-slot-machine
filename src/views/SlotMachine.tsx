import React, { useState, useEffect } from "react";
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

  const [letReelSpin, setLetReelSpin] = useState({
    reel1: false,
    reel2: false,
    reel3: false,
    finish: false,
  });

  const spinningReel = (reel: string, nextReel: string) => {
    const spinningReel = setInterval(() => {
      setReels((prevState: any) => {
        return {
          ...prevState,
          [reel]:
            SLOT_MACHINE[reel][getRandomNumber(0, SLOT_MACHINE[reel].length)],
        };
      });
    }, 100);

    setTimeout(() => {
      clearInterval(spinningReel);
      setLetReelSpin((prevState: any) => {
        return { ...prevState, [reel]: false, [nextReel]: true };
      });
    }, 1000);
  };

  const spin = () => {
    setCoins((prevState: any) => prevState - 1);
    setLetReelSpin((prevState: any) => {
      return { ...prevState, reel1: true };
    });
  };

  useEffect(() => {
    if (letReelSpin.reel1) {
      spinningReel("reel1", "reel2");
    }
    if (letReelSpin.reel2) {
      spinningReel("reel2", "reel3");
    }
    if (letReelSpin.reel3) {
      spinningReel("reel3", "finish");
    }
    if (letReelSpin.finish) {
        
      const rewardsCoins = slotMachineRewardRules(reels);
      setGainCoins(rewardsCoins);
      setCoins((prevState: any) => prevState + rewardsCoins);
    }
  }, [letReelSpin, reels]);

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
