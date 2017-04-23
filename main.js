// import { MAX, stack, unStack, displayTableStacks } from 'stackServices';
const stackServices = require("./stackServices.js");
const parser = require("./parser.js");
const processor = require("./process.js");
const readlineSync = require('readline-sync');
const chalk = require('chalk');
const lineReader = require('line-reader');

let table = [];
let blocksWorld;
let lineCounter = 0;

//basic automation that keeps reading command line and processing it
lineReader.eachLine('blocksWorld.txt', function(commandLine, last) {
    let commands;
    if(last || (commandLine === stackServices.ORDERS.quit)) {
        return stackServices.displayTableStacks(table);
    }
    if (lineCounter === 0) { // TODO: find a less disgraceful way to get first line
        blocksWorld = stackServices.init(table, parseInt(commandLine));
    } else { // lineCounter === 1 or even greater
        commands = parser.parseCommand(commandLine, blocksWorld);
        processor.executeCommand(table, commands);
    }
    lineCounter++;
});