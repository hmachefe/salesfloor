// import { MAX, stack, unStack, displayTableStacks } from 'stackServices';
const stackServices = require("./stackServices.js");
const parser = require("./parser.js");
const readlineSync = require('readline-sync');
const chalk = require('chalk');

/**
 * main loop function, basic automation that keeps reading standard input, line by line
 */
function mainLoop() {

  console.log(chalk.green('Enter the number of blocks'));
  const n = readlineSync.question("");
  const blocksWorld = parser._init(n);
  
  console.log(chalk.blue('Enter the sequence of block commands, one command per line'));
  while (true) {

    // as long as user enters text line..
    commandLine = readlineSync.question("");

    /* in case orders have been completed, le's break the infinite loop */
    if (commandLine === 'quit') {
      break;
    }
	
	const commands = parser.parseCommand(commandLine, blocksWorld);
	parser.executeCommand(blocksWorld, commands);
	
  }

  stackServices.displayTableStacks(blocksWorld);
}

mainLoop();