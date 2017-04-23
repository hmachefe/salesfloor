/**
 * private method: local purpose
 */
function _top (block) {
    while (undefined !== block.upward) {
      block = block.upward;
    }
    return block;
}

/**
 * modules exportation supported by node 6
 */
module.exports = {
    /**
     * few constant structures here
     */
    MAX: 25,
    ORDERS: {
        move: 'move',
        pile: 'pile'
    },
    COORDINATIONS: {
        onto: 'onto',
        over: 'over'
    },

    /**
     * method that displays output result, after quit-ing main loop automation
     */
    displayTableStacks: function (blockWorld) {
        for (let index = 0; index < blockWorld.length; index++) {
            let msg = `${index} :`;
            for (let block = blockWorld[index]; block !== undefined; block = block.upward)  {
                msg += ` ${block.original_value}`;
            }
            console.log(msg);
        }
    },
    /**
     * method that un-stacks blocks from their pile and place them back again
     * 'flat' on the table at their previous location (by block.original_value)
     */
    unStack: function (tab, block) {
        let temp;
        while (undefined !== block.upward) {
            temp = block.upward;
            block.upward = undefined;
            temp.downward = undefined;
            temp.table_position = temp.original_value;
            tab[temp.original_value] = temp;
            block = temp;
        }
    },
    /**
     * method that piles blocks from their current location (source.table_position)
     * and place them on top of another pile (target.table_postion)
     */
    stack: function (tab, source, target) {
        let top_target = _top(target);
        let source_downward = source.downward;
        let table_position = target.table_position;

        if (undefined !== source_downward) {
            source_downward.upward = undefined;
        } else {
            tab[source.original_value] = undefined;
        }

        top_target.upward = source;
        source.downward = top_target;

        while (undefined !== source) {
            source.table_position = table_position;
            source = source.upward;
        }
    }

};