import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import "./style/SlotMachine.css";
import {
  getRandomNumber,
  slotMachineRewardRules,
  convertFruitTextToEmoji,
} from "../helpers";
import { SLOT_MACHINE, REELS_SPINNING_TIMER } from "../config";

let spinReelTimer: any = null;
const SlotMachine = () => {
  //State
  const [reels, setReels] = useState({
    reel1: SLOT_MACHINE.reel1[0],
    reel2: SLOT_MACHINE.reel2[1],
    reel3: SLOT_MACHINE.reel3[2],
  });
  const [coins, setCoins] = useState(20);
  const [gainCoins, setGainCoins] = useState(0);
  const [spinTimer, setSpinTimer] = useState(REELS_SPINNING_TIMER);
  const [letReelSpin, setLetReelSpin] = useState({
    reel1: false,
    reel2: false,
    reel3: false,
    finish: false,
  });
  const [spinReelTurn, setSpinReelTurn] = useState({
    current: "",
    next: "",
  });
  //Functions
  const spinningReel = useCallback((reel: string) => {
    spinReelTimer = setTimeout(() => {
      setReels((prevState: any) => {
        return {
          ...prevState,
          [reel]:
            SLOT_MACHINE.reel1[getRandomNumber(0, SLOT_MACHINE.reel1.length)],
        };
      });
      setSpinTimer((prevState: any) => prevState - 1);
    }, 200);
  }, []);

  const spin = () => {
    setCoins((prevState: any) => prevState - 1);
    setLetReelSpin((prevState: any) => {
      return { ...prevState, reel1: true };
    });
  };

  //Sides Effects
  useEffect(() => {
    if (letReelSpin.reel1) {
      spinningReel("reel1");
      setSpinReelTurn({ current: "reel1", next: "reel2" });
    }
    if (letReelSpin.reel2) {
      spinningReel("reel2");
      setSpinReelTurn({ current: "reel2", next: "reel3" });
    }
    if (letReelSpin.reel3) {
      spinningReel("reel3");
      setSpinReelTurn({ current: "reel3", next: "finish" });
    }
    if (letReelSpin.finish) {
      const rewardsCoins = slotMachineRewardRules(reels);
      setGainCoins(rewardsCoins);
      setCoins((prevState: any) => prevState + rewardsCoins);
      setLetReelSpin((prevState: any) => {
        return { ...prevState, finish: false };
      });
    }
  }, [letReelSpin, reels, spinningReel]);

  useEffect(() => {
    if (spinTimer === 0) {
      clearTimeout(spinReelTimer);
      setLetReelSpin((prevState: any) => {
        return {
          ...prevState,
          [spinReelTurn.current]: false,
          [spinReelTurn.next]: true,
        };
      });
      setSpinTimer(REELS_SPINNING_TIMER);
    }
  }, [spinTimer, spinReelTurn]);

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
