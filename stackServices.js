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

  MAX: 25,

  ORDERS: {
    move: 'move',
    pile: 'pile'
  },

  COORDINATIONS: {
    onto: 'onto',
    over: 'over'
  },

  displayTableStacks: function (tab, n) {
    for (let index = 0; index < n; index++) {
      let msg = `${index} :`;
      for (let block = tab[index]; block !== undefined; block = block.upward)  {
        msg += ` ${block.original_value}`;
      }
      console.log(msg);
    }
  },

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
