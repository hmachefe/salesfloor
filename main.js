// import { MAX, stack, unStack, displayTableStacks } from 'stackServices';
const stackServices = require("./stackServices.js");
const parser = require("./parser.js");
const processor = require("./process.js");
const chalk = require('chalk');
const lineReader = require('line-reader');

let table = [];
let blocksWorld;
let stackServicesInitialized = false;

function startReader(scenarioFile) {
    scenarioFile = scenarioFile || stackServices.configuration.SCENARIO_FILE;
    //basic automation that keeps reading each command line and processing
    lineReader.eachLine(scenarioFile, function(commandLine, last) {
        let commands;
        if(last || (commandLine === stackServices.configuration.ORDERS.quit)) {
            let report = stackServices.displayTableStacks(table);
            stackServices.generateReport(report);
            return;
        }
        if (!stackServicesInitialized) {
            // TODO: try to even find better way.. , for instance:
            // if (Number.isInteger(ParseInt(commandLine)) {...}
            blocksWorld = stackServices.init(table, parseInt(commandLine));
            stackServicesInitialized = true;
        } else { // lineCounter === 1 or even greater
            commands = parser.parseCommand(commandLine, blocksWorld);
            processor.executeCommand(table, commands);
        }
    });
}

const SCENARIO_FILE = process.argv[2];
startReader(SCENARIO_FILE);
