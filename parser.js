const stackServices = require("./stackServices.js");
/**
 * modules exportation supported by node 6
 */
module.exports = {
	init: function (tab, n) {
	  const blocks = [];
	  for (let index = 0; index < n && stackServices.MAX; index++) {
		blocks[index] = {
			table_position: index,
			original_value: index,
			upward: undefined,
			downward: undefined
	    };
	  	tab[index] = blocks[index];
	  }
	  return blocks;
	},
   parseCommand: function (commandLine, blocks) {
		const commandWords = commandLine.split(" ")
		const source = commandWords[1]; 	// Get the source
		const target = commandWords[3];		// Get the target
		
		return {
			order: commandWords[0],			// Get the order
			source_block: blocks[source],
			coordination: commandWords[2],	// Get the coordination word
			target_block: blocks[target],
		};
	},
	executeCommand: function(table, commands) {
	    // In case order is illegal, skip it
		if(commands.source_block.table_position === commands.target_block.table_position) {
			return;
		}

		// unstack blocks which are downside `target_block` when coordination word has been set to `onto`
		if(commands.coordination === stackServices.COORDINATIONS.onto) {
		  stackServices.unStack(table, commands.target_block);
		}

		// unstack blocks which are upside `source_block` when order has been set to `move`
		if(commands.order === stackServices.ORDERS.move) {
		  stackServices.unStack(table, commands.source_block);
		}

		// Put `source_block` over `target_block`
		stackServices.stack(table, commands.source_block, commands.target_block);

	}

};