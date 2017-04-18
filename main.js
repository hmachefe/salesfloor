// import { MAX, stack, unStack, displayTableStacks } from 'stackServices';
const stackServices = require("./stackServices.js");
const readlineSync = require('readline-sync');
const chalk = require('chalk');

/**
 * private method: initialization purpose
 * each block is double-chained to access it closest neigbours (upside and dowside)
 */
function _init(tab, blocks, n) {
  for (let index = 0; index < n; index++) {
    blocks[index] = {};
    blocks[index].table_position = index;
    blocks[index].original_value = index;
    blocks[index].upward = undefined;
    blocks[index].downward = undefined;
    tab[index] = blocks[index];
  }
}

/**
 * main loop function, basic automation that keeps reading standard input, line by line
 */
function mainLoop() {
  let n, commandLine, order, coordination;
  let source, source_block, target, target_block;
  let table = Array(stackServices.MAX)
  let blocks = [];

  console.log(chalk.green('Enter the number of blocks'));
  n = readlineSync.question("");
  _init(table, blocks, n);

  console.log(chalk.blue('Enter the sequence of block commands, one command per line'));
  while (true) {

    // as long as user enters text line..
    commandLine = readlineSync.question("");

    /* in case orders have been completed, le's break the inifite loop */
    if (commandLine === 'quit') {
      break;
    }

    commandWords = commandLine.split(" ")

    // Get the order
    order = commandWords[0];

    // Get the source
    source = commandWords[1];
    source_block = blocks[source];

    // Get the coordination word
    coordination = commandWords[2];

    // Get the target */
    target = commandWords[3];
    target_block = blocks[target];

    // In case order is illegal, skip it
    if(source_block.table_position === target_block.table_position) {
      continue;
    }

    // unstack blocks which are downside `target_block` when coordination word has been set to `onto`
    if(coordination === stackServices.COORDINATIONS.onto) {
      stackServices.unStack(table, target_block);
    }

    // unstack blocks which are upside `source_block` when order has been set to `move`
    if(order === stackServices.ORDERS.move) {
      stackServices.unStack(table, source_block);
    }

    // Put `source_block` over `target_block`
    stackServices.stack(table, source_block, target_block);
  }

  stackServices.displayTableStacks(table, n);
}

mainLoop();
