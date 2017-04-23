const stackServices = require("./stackServices.js");

/**
 * modules exportation supported by node 6
 */
module.exports = {
   parseCommand: (commandLine, blocks) => {
		const commandWords = commandLine.split(" ")
		const source = commandWords[1]; 	// Get the source
		const target = commandWords[3];		// Get the target
		return {
			order: commandWords[0],			// Get the order
			source_block: blocks[source],
			coordination: commandWords[2],	// Get the coordination word
			target_block: blocks[target],
		};
	}
};