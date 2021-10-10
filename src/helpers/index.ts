export const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const slotMachineRewardRules = (reels: {
  reel1: string;
  reel2: string;
  reel3: string;
}) => {
  const { reel1, reel2, reel3 } = reels;
  /*cherry award*/
  if (reel1 === "cherry" && reel2 === "cherry" && reel3 === "cherry") {
    return 50;
  }

  if (reel1 === "cherry" && reel2 === "cherry") {
    return 40;
  }
  /*apple award*/

  if (reel1 === "apple" && reel2 === "apple" && reel3 === "apple") {
    return 20;
  }
  if (reel1 === "apple" && reel2 === "apple") {
    return 10;
  }
  /*banana award*/

  if (reel1 === "banana" && reel2 === "banana" && reel3 === "banana") {
    return 15;
  }

  if (reel1 === "banana" && reel2 === "banana") {
    return 5;
  }
  /*lemon award*/

  if (reel1 === "lemon" && reel2 === "lemon" && reel3 === "lemon") {
    return 3;
  }
};
