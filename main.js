// import { MAX, stack, unStack, displayTableStacks } from 'stackServices';
const stackServices = require("./stackServices.js");
const parser = require("./parser.js");
const process = require("./process.js");
const readlineSync = require('readline-sync');
const chalk = require('chalk');

/**
 * main loop function, basic automation that keeps reading standard input, line by line
 */
function mainLoop() {
  let table = [];
  console.log(chalk.green('Enter the number of blocks'));
  const n = readlineSync.question("");
  const blocksWorld = stackServices.init(table, n);

  while (true) {
    commandLine = readlineSync.question(""); // as long as user enters text line..
    if (commandLine === stackServices.ORDERS.quit) { // in case orders get completed, let's break the infifite loop
      break;
    }
    const commands = parser.parseCommand(commandLine, blocksWorld);
    process.executeCommand(table, commands);
  }

  stackServices.displayTableStacks(table);
}

mainLoop();