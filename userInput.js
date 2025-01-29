import readlineSync from "readline-sync";

// Function to handle user input for dice choice
export const getUserDiceChoice = (diceSets) => {
  return readlineSync.keyInSelect(
    diceSets.map((_, i) => `Dice ${i + 1}`),
    "Select your dice:"
  );
};

// Function to handle user roll input
export const getUserRollInput = () => {
  const userRollChoice = readlineSync.questionInt(
    "Enter a number (0-5) for your roll: ",
    { limit: [0, 5] }
  );
  const userRollForComputer = readlineSync.questionInt(
    "Enter a number (0-5) to influence the computer's roll: ",
    { limit: [0, 5] }
  );

  return { userRollChoice, userRollForComputer };
};
