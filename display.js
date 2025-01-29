import chalk from "chalk";
import { table } from "table";

// Function to display dice sets in a table format
export const displayDiceSets = (diceSets) => {
  const data = [["Dice", "Numbers"]];
  diceSets.forEach((dice, i) => {
    data.push([`Dice ${i + 1}`, dice.join(", ")]);
  });

  console.log(chalk.cyan(table(data)));
};
