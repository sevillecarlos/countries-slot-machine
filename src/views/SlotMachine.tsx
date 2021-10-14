import React, { useState, useEffect, useCallback } from "react";
import { getSlotMachineResult } from "../app/slices/slot-machine";
import { Button } from "react-bootstrap";

import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { getRandomNumber, convertFruitTextToEmoji } from "../helpers";
import { SLOT_MACHINE, REELS_SPINNING_TIMER } from "../config";

import "./style/SlotMachine.css";

let spinReelTimer: any = null;
const slotMachineMap = new Map(Object.entries(SLOT_MACHINE));

const SlotMachine = () => {
  const dispatch = useAppDispatch();

  const slotMachine = useAppSelector(
    (state: RootStateOrAny) => state.slotMachine
  );

  //State
  const [reels, setReels] = useState({
    reel1: SLOT_MACHINE.reel1[0],
    reel2: SLOT_MACHINE.reel2[1],
    reel3: SLOT_MACHINE.reel3[2],
  });
  const [coins, setCoins] = useState(20);
  const [gainCoins, setGainCoins] = useState(0);
  const [rolling, setRolling] = useState(false);

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
          [reel]: slotMachineMap.get(reel)?.[getRandomNumber(8, 0)],
        };
      });
      setSpinTimer((prevState: any) => prevState - 1);
    }, 170);
  }, []);

  const spin = () => {
    setCoins((prevState: any) => prevState - 1);
    setRolling(true);
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
      dispatch(getSlotMachineResult(reels));
      setRolling(false);
      setLetReelSpin((prevState: any) => {
        return { ...prevState, finish: false };
      });
    }
  }, [letReelSpin, reels, spinningReel, dispatch]);
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

  useEffect(() => {
    setGainCoins(slotMachine.winningCoins);
    setCoins((prevState: any) => prevState + slotMachine.winningCoins);
  }, [slotMachine.winningCoins]);

  return (
    <div>
      {coins === 0 && <span>You dont have more coins</span>}
      <div id="slot-details">
        <div id="slot-top"></div>
      </div>

      <div className="slot-machine">
        <h5> 🎰Slot Machine</h5>
        <div className="slot-machine-reels ">
          <span>{convertFruitTextToEmoji(reels.reel1)}</span>
          <span>{convertFruitTextToEmoji(reels.reel2)}</span>
          <span>{convertFruitTextToEmoji(reels.reel3)}</span>
        </div>
        <div className="slot-machine-coins-container">
          <span>{coins.toString().padStart(8, "0")}</span>
        </div>
        <div className="slot-machine-spin-btn-container">
          <button
            className="pushable"
            disabled={coins === 0 || rolling}
            onClick={spin}
          >
            <span className="front">SPIN</span>
          </button>
        </div>
      </div>
      <div id="slot-bottom"></div>
    </div>
  );
};

export default SlotMachine;
