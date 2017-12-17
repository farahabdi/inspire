import rules from './rules'

// Source: http://www.robweir.com/blog/2010/02/microsoft-random-browser-ballot.html
const shuffle = list => {
    return list.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
}

const checkGameStatus = list => {
    for (let index = 0; index < list.length; index++) { 
        if (list[index].key !== index.toString()) {
            return false
        }
    }
    return true
}

const validMoves = (emptyIndex) => rules[emptyIndex.toString()][emptyIndex.toString()]

export {
    validMoves,
    shuffle,
    checkGameStatus
}