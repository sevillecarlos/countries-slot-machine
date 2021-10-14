export const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};


//Convert the fruit text into emoji
export const convertFruitTextToEmoji = (fruitText: string) => {
  let emojiFruit;
  switch (fruitText) {
    case "cherry":
      emojiFruit = "🍒";
      break;
    case "apple":
      emojiFruit = "🍎";
      break;
    case "banana":
      emojiFruit = "🍌";
      break;
    case "lemon":
      emojiFruit = "🍋";
      break;
    default:
      emojiFruit = "";
      break;
  }

  return emojiFruit;
};
