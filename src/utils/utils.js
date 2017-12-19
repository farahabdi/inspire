/**
 * Takes array of list of nodes and shuffles them properly
 * Source: http://www.robweir.com/blog/2010/02/microsoft-random-browser-ballot.html
 * @param {Object} list
 * @returns {Object}
 */

const shuffle = list => {
  return list.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1])
}

/**
 * Takes list of all nodes and checks to see if game is complete.
 * @param {Object} list
 * @returns {Boolean}
 */

const gameStatus = list => {
  for (let index = 0; index < list.length; index++) {
    if (list[index].key !== index.toString()) {
      return false
    }
  }
  return true
}

/**
 * Takes index of clicked item and empty Index and swaps them
 * @param {Object} list
 * @param {number} currentIndex
 * @param {number} emptyIndex
 * @returns {Object} list
 */

const swap = (list, currentIndex, emptyIndex) => {
  const temp = list[currentIndex]
  list[currentIndex] = list[emptyIndex]
  list[emptyIndex] = temp
  return list
}

/**
 * @return {Array}
 * Lookup table for board rules.
 *  Ex. At position "0", only items [1, 4] are valid. Can get valid positions in 0(1).
/* [ _,  1,   2,  3 ]
/* [ 4,  5,   6,  7 ]
/* [ 8,  9,  10, 11 ]
/* [ 0,  12, 13, 14 ]
*/

const rules = new Map([
  ['0', [ 1, 4 ]],
  ['1', [ 0, 2, 5 ]],
  ['2', [ 1, 3, 6 ]],
  ['3', [ 2, 7 ]],
  ['4', [ 0, 5, 8 ]],
  ['5', [ 1, 4, 6, 9 ]],
  ['6', [ 2, 5, 7, 10 ]],
  ['7', [ 3, 6, 11 ]],
  ['8', [ 4, 9, 12 ]],
  ['9', [ 5, 8, 10, 13 ]],
  ['10', [ 6, 9, 11, 14 ]],
  ['11', [ 7, 10, 15 ]],
  ['12', [ 8, 13 ]],
  ['13', [ 12, 9, 14 ]],
  ['14', [ 10, 13, 15 ]],
  ['15', [ 11, 14 ]]
])

export {
    shuffle,
    gameStatus,
    swap,
    rules
}
