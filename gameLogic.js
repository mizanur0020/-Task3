import chalk from "chalk";
import readlineSync from "readline-sync";
import { getSecureRandom, generateHMAC } from "./cryptoUtils.js";
import { displayDiceSets } from "./display.js";
import { getUserDiceChoice, getUserRollInput } from "./userInput.js";
import crypto from "crypto";
// Function to play the game
export const playGame = (diceSets) => {
  console.log(chalk.yellow("Let's determine who selects the dice first."));

  const key1 = crypto.randomBytes(32).toString("hex");
  const key2 = crypto.randomBytes(32).toString("hex");
  const key3 = crypto.randomBytes(32).toString("hex");

  // Step 1: Determine who picks dice first
  const userFirstMoveChoice = readlineSync.questionInt(
    "Enter a number (0 or 1) to determine who selects the dice first: ",
    { limit: [0, 1] }
  );
  const computerFirstMoveChoice = getSecureRandom(2);

  const combinedFirstMoveChoice =
    (userFirstMoveChoice + computerFirstMoveChoice) % 2;
  const hmac1 = generateHMAC(key1, combinedFirstMoveChoice);

  console.log(`HMAC (First Move): ${hmac1}`);
  console.log(`Your choice: ${userFirstMoveChoice}`);
  console.log(`Computer's choice: ${computerFirstMoveChoice}`);
  console.log(`Combined choice: ${combinedFirstMoveChoice}`);

  if (combinedFirstMoveChoice === 0) {
    console.log(chalk.green("You select the dice first!"));
  } else {
    console.log(chalk.red("Computer selects the dice first!"));
  }

  displayDiceSets(diceSets);

  let userDice, computerDice;
  if (combinedFirstMoveChoice === 0) {
    const diceIndex = getUserDiceChoice(diceSets);
    if (diceIndex === -1) {
      console.log(chalk.yellow("Exiting game."));
      return;
    }
    userDice = diceSets[diceIndex];
    computerDice = diceSets[getSecureRandom(diceSets.length)];
  } else {
    computerDice = diceSets[getSecureRandom(diceSets.length)];
    userDice = diceSets[getSecureRandom(diceSets.length)];
  }

  console.log(chalk.green(`You are playing with: ${userDice.join(", ")}`));
  console.log(
    chalk.red(`Computer is playing with: ${computerDice.join(", ")}`)
  );

  // Step 2: User inputs roll numbers
  const { userRollChoice, userRollForComputer } = getUserRollInput();

  // Computer generates random numbers
  const computerRollChoice = getSecureRandom(6);
  const computerRollForUser = getSecureRandom(6);

  // Final roll values
  const userRoll = (userRollChoice + computerRollForUser) % 6;
  const computerRoll = (computerRollChoice + userRollForComputer) % 6;

  const hmac2 = generateHMAC(key2, userRoll);
  const hmac3 = generateHMAC(key3, computerRoll);

  console.log(`HMAC (User Roll): ${hmac2}`);
  console.log(`HMAC (Computer Roll): ${hmac3}`);

  console.log(chalk.green(`You rolled: ${userDice[userRoll]}`));
  console.log(chalk.red(`Computer rolled: ${computerDice[computerRoll]}`));

  if (userDice[userRoll] > computerDice[computerRoll]) {
    console.log(chalk.green("You win!"));
  } else if (userDice[userRoll] < computerDice[computerRoll]) {
    console.log(chalk.red("Computer wins!"));
  } else {
    console.log(chalk.yellow("It's a draw!"));
  }

  console.log(`HMAC Key 1 (First Move): ${key1}`);
  console.log(`HMAC Key 2 (User Roll): ${key2}`);
  console.log(`HMAC Key 3 (Computer Roll): ${key3}`);
};
