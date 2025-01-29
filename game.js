import readlineSync from "readline-sync";
import chalk from "chalk";
import { getSecureRandom } from "./random.js";
import { generateHMAC } from "./hmac.js";
import { displayDiceSets } from "./display.js";
import { printHelp } from "./help.js";
import crypto from "crypto";

export const playGame = (diceSets) => {
  console.log(chalk.yellow("Let's determine who makes the first move."));

  const key = crypto.randomBytes(32).toString("hex");

  const userFirstMoveChoice = readlineSync.questionInt(
    "Enter a number (0 or 1) to determine who goes first: ",
    { limit: [0, 1] }
  );
  const computerFirstMoveChoice = getSecureRandom(2);

  const combinedFirstMoveChoice =
    (userFirstMoveChoice + computerFirstMoveChoice) % 2;

  const hmac = generateHMAC(key, combinedFirstMoveChoice);
  console.log(`HMAC: ${hmac}`);

  console.log(`Your choice: ${userFirstMoveChoice}`);
  console.log(`Computer's choice: ${computerFirstMoveChoice}`);
  console.log(`Combined choice: ${combinedFirstMoveChoice}`);

  if (combinedFirstMoveChoice === 0) {
    console.log(chalk.green("You go first!"));
  } else {
    console.log(chalk.red("Computer goes first!"));
  }

  displayDiceSets(diceSets);

  const diceIndex = readlineSync.keyInSelect(
    diceSets.map((dice, i) => `Dice ${i + 1}`),
    "Select your dice:"
  );

  if (diceIndex === -1) {
    console.log(chalk.yellow("Exiting game."));
    return;
  }

  const userDice = diceSets[diceIndex];
  const computerDice = diceSets[getSecureRandom(diceSets.length)];

  const userRollChoice = readlineSync.questionInt(
    "Enter a number (0-5) for your roll: ",
    { limit: [0, 5] }
  );
  const computerRollChoice = getSecureRandom(6);

  const userRoll = (userRollChoice + getSecureRandom(6)) % 6;
  const computerRoll = (computerRollChoice + getSecureRandom(6)) % 6;

  console.log(chalk.green(`You rolled: ${userDice[userRoll]}`));
  console.log(chalk.red(`Computer rolled: ${computerDice[computerRoll]}`));

  if (userDice[userRoll] > computerDice[computerRoll]) {
    console.log(chalk.green("You win!"));
  } else if (userDice[userRoll] < computerDice[computerRoll]) {
    console.log(chalk.red("Computer wins!"));
  } else {
    console.log(chalk.yellow("It's a draw!"));
  }

  console.log(`HMAC Key: ${key}`);
};
