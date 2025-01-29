import chalk from "chalk";
export const printHelp = () => {
  console.log(chalk.green("Help Menu:"));
  console.log(
    chalk.green(
      "1. Select a dice from the available options to play.\n" +
        "2. The computer will select a random dice and roll.\n" +
        "3. The HMAC ensures fairness in random number generation.\n" +
        "4. Exit the game by choosing 'X'.\n"
    )
  );
};
