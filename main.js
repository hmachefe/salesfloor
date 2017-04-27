// import { MAX, stack, unStack, displayTableStacks } from 'stackServices';
const stackServices = require("./stackServices.js");
const parsingModule = require("./parser.js");
const processingModule = require("./process.js");
const lineReader = require('line-reader');
const SCENARIO_FILE = process.argv[2];
const parserInstance = new parsingModule.parserClass();
const processorInstance = new processingModule.processorClass();
const configInstance = new stackServices.configClass();


class BlocksWorldAutomation {

    constructor(defaultTable = [], stackServicesInitialized = false, scenarioFile = stackServices.configuration.SCENARIO_FILE) {
        this.scenarioFile = scenarioFile;
        this.table = defaultTable;
        this.stackServicesInitialized = false;
    }

    start () {
        let blocksWorld;
        //basic automation that keeps reading each command line and processing
        lineReader.eachLine(this.scenarioFile, (commandLine, last) => {
            let commands;
            if(last || (commandLine === configInstance.configuration.ORDERS.quit)) {
                let report = configInstance.displayTableStacks(this.table);
                configInstance.generateReport(report);
                return;
            }
            if (!this.stackServicesInitialized) {
                // TODO: try to even find better way.. , for instance:
                // if (Number.isInteger(ParseInt(commandLine)) {...}
                blocksWorld = configInstance.init(this.table, parseInt(commandLine));
                this.stackServicesInitialized = true;
            } else {
                commands = parserInstance.parseCommand(commandLine, blocksWorld);
                processorInstance.executeCommand(this.table, commands);
            }
        });
    }

}

const initArgs = [[], false, SCENARIO_FILE];
const blocksMachine = new BlocksWorldAutomation(...initArgs);
blocksMachine.start();
