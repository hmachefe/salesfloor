const fs = require('fs');
// TODO: offer file reading harmonization, as a common service. Decide about synchronization (blocking or not)
var CONFIG = JSON.parse(fs.readFileSync('configuration.json', 'utf8'));

/**
 * private method: local purpose
 */
_top = function (block) {
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
    configuration: CONFIG,

    /**
     * initialization purpose, creating `tab` array and `blocks` returned as an array of empty blocks
     */
    init: (tab, n) => {
        const blocks = [];
        for (let index = 0; index < n && CONFIG.BLOCKS_MAX; index++) {
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
        let messageReport = '';
        for (let index = 0; index < tab.length; index++) {
            let message = `${index} :`;
            for (let block = tab[index]; block !== undefined; block = block.upward)  {
                message += ` ${block.original_value}`;
            }
            console.log(message);
            messageReport += message + '\r\n';
        }
        return messageReport;
    },
    generateReport: (report) => {
        let stream = fs.createWriteStream("report.txt");
        stream.once('open', function(fd) {
            stream.write(report);
            stream.end();
        });
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
