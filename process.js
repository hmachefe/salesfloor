const stackServices = require("./stackServices.js");
configInstance = new stackServices.configClass();

class Processor {

	executeCommand (table, commands) {
	    // In case order is illegal, skip it
		if(commands.source_block.table_position === commands.target_block.table_position) {
			return;
		}
		// unstack blocks which are downside `target_block` when coordination word has been set to `onto`
		if(commands.coordination === stackServices.configuration.COORDINATIONS.onto) {
		  configInstance.unStack(table, commands.target_block);
		}
		// unstack blocks which are upside `source_block` when order has been set to `move`
		if(commands.order === stackServices.configuration.ORDERS.move) {
		  configInstance.unStack(table, commands.source_block);
		}
		// Put `source_block` over `target_block`
		configInstance.stack(table, commands.source_block, commands.target_block);
	}

}

/**
 * modules exportation supported by node 6
 */
module.exports = {

	processorClass: Processor

};