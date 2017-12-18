import rules from './rules'

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
 * Takes index of current empty item and returns list of valid positions
 * @param {number} emptyIndex
 * @returns {Array}
 */

const validMoves = (emptyIndex) => rules[`${emptyIndex}`][`${emptyIndex}`]

export {
    validMoves,
    shuffle,
    gameStatus,
    swap
}
