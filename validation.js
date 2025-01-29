import chalk from "chalk";
export const validateAndParseArgs = (args) => {
  if (args.length < 3) {
    console.error(
      chalk.red(
        "Error: You must provide at least 3 dice configurations, each containing 6 comma-separated integers.\n" +
          "Example: node game.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7"
      )
    );
    process.exit(1);
  }
  return args.map((arg) => {
    const numbers = arg.split(",").map(Number);
    if (numbers.length !== 6 || numbers.some(isNaN)) {
      console.error(
        chalk.red(
          `Error: Invalid dice configuration "${arg}". Each dice must have exactly 6 integers.`
        )
      );
      process.exit(1);
    }
    return numbers;
  });
};
