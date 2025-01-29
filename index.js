import { displayBanner } from "./banner.js";
import { validateAndParseArgs } from "./args.js";
import { playGame } from "./gameLogic.js";

// Main execution
displayBanner();
const args = process.argv.slice(2);
const diceSets = validateAndParseArgs(args);
playGame(diceSets);
