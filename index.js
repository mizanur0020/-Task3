import { displayBanner } from "./banner.js";
import { validateAndParseArgs } from "./validation.js";
import { playGame } from "./game.js";

displayBanner();

const args = process.argv.slice(2);
const diceSets = validateAndParseArgs(args);

playGame(diceSets);
