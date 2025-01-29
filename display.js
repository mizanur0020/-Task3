import chalk from "chalk";
import { table } from "table";
export const displayDiceSets = (diceSets) => {
  const data = [["Dice", "Numbers"]];
  diceSets.forEach((dice, i) => {
    data.push([`Dice ${i + 1}`, dice.join(", ")]);
  });

  const config = {
    columns: [{ alignment: "center" }, { alignment: "center" }],
  };

  console.log(chalk.cyan(table(data, config)));
};
