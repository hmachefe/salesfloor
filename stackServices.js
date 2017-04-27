const fs = require('fs');
// TODO: offer file reading harmonization, as a common service. Decide about synchronization (blocking or not)
let CONFIG_FILE = JSON.parse(fs.readFileSync('configuration.json', 'utf8'));
let instance = null;

/**
 * private method: local purpose
 */
let _top = function (block) {
    while (undefined !== block.upward) {
      block = block.upward;
    }
    return block;
}

/**
 * establish chaining between destination and origin blocks (vice-versa)
 */
let _doubleBindBlocks = function (destination, origin) {
      destination.upward = origin;
      origin.downward = destination;
};

/**
 * put a given `block` (and its siblings below in same column) to a new `position`
 */
let _moveBlocksToPosition = function (block, position) {
    block.table_position = position;
    block = block.upward;
    while (undefined !== block) {
        block.table_position = position;
        block = block.upward;
    }
};

class Config {

  /* use singleton */
  constructor() {
      if(!instance){
            instance = this;
      }
      this.configuration = CONFIG_FILE;
      return instance;
    }

  init(tab, n) {
        const blocks = [];
        for (let index = 0; index < n && CONFIG_FILE.BLOCKS_MAX; index++) {
            blocks[index] = {
                table_position: index,
                original_value: index,
                upward: undefined,
                downward: undefined
          };
          tab[index] = blocks[index];
      }
      return blocks;
    }

  /**
   * method that displays output result, after quit-ing main loop automation
   */
  displayTableStacks (tab) {
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
  }

  generateReport (report) {
      let stream = fs.createWriteStream("report.txt");
      stream.once('open', function(fd) {
          stream.write(report);
          stream.end();
      });
  }

  /**
   * method that un-stacks blocks from their pile and place them back again
   * 'flat' on the table at their previous location (by block.original_value)
   */
  unStack (tab, block) {
      let temp;
      while (undefined !== block.upward) {
          temp = block.upward;
          block.upward = undefined;
          temp.downward = undefined;
          temp.table_position = temp.original_value;
          tab[temp.original_value] = temp;
          block = temp;
      }
  }

  /**
   * method that piles blocks from their current location (source.table_position)
   * and place them on top of another pile (target.table_postion)
   */
  stack (tab, source, target) {
      let top_target = _top(target);
      let source_downward = source.downward;
      let position = target.table_position;

      if (undefined !== source_downward) {
          source_downward.upward = undefined;
      } else {
          tab[source.original_value] = undefined;
      }

      // bind `top_target` block to `source` one back and forth
      _doubleBindBlocks(top_target, source);

      // move block and siblings on top of if to new position
      _moveBlocksToPosition(source, position);
  }
}


/**
 * modules exportation supported by node 6
 */
module.exports = {

    configClass: Config,
    /**
     * few constant structures here
     */
    configuration: CONFIG_FILE,

};
