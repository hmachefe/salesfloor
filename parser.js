let instance = null;

class Parser {

  /* use singleton */
  constructor() {
      if(!instance){
            instance = this;
      }
      return instance;
    }

   parseCommand (commandLine, blocks) {
		const commandWords = commandLine.split(" ")
		const source = commandWords[1]; 	// Get the source
		const target = commandWords[3];		// Get the target

		// for some, destructuring desn't work at some points, while passing Parser as a class  ;-S
	   	let commands = {
			order: commandWords[0],			// Get the order
			source_block: blocks[source],
			coordination: commandWords[2],	// Get the coordination word
			target_block: blocks[target],
		};
		return commands;
	}

}

/**
 * modules exportation supported by node 6
 */
module.exports = {

   parserClass: Parser

};