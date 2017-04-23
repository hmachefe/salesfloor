const BLOCKS_MAX = 25;

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
    MAX: BLOCKS_MAX,
    ORDERS: {
        move: 'move',
        pile: 'pile',
        quit: 'quit'
    },
    COORDINATIONS: {
        onto: 'onto',
        over: 'over'
    },

    /**
     * initialization purpose, creating `tab` array and `blocks` returned as an array of empty blocks
     */
    init: (tab, n) => {
      const blocks = [];
      for (let index = 0; index < n && BLOCKS_MAX; index++) {
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
    /**
     * method that displays output result, after quit-ing main loop automation
     */
    displayTableStacks: (tab) => {
        for (let index = 0; index < tab.length; index++) {
            let msg = `${index} :`;
            for (let block = tab[index]; block !== undefined; block = block.upward)  {
                msg += ` ${block.original_value}`;
            }
            console.log(msg);
        }
    },
    /**
     * method that un-stacks blocks from their pile and place them back again
     * 'flat' on the table at their previous location (by block.original_value)
     */
    unStack: (tab, block) => {
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
    stack: (tab, source, target) => {
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
