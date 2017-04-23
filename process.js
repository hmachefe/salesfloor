const stackServices = require("./stackServices.js");
/**
 * modules exportation supported by node 6
 */
module.exports = {
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