var regType = {
    'g': 1,
    'm': 1,
    'i': 1
};

function readRegexp(walker) {
    const begin = walker.currentToken()
    walker.nextToken()
    const beginIndex = walker.index - 1
    let currentChar = ''

    while (currentChar = walker.currentChar()) {
        if (currentChar === '\\') {
            walker.nextChar()
        } else if (currentChar === begin) {
            break
        }
        walker.nextChar()
    }

    // TODO error
    if (begin !==  currentChar) {
    }

    walker.nextChar()
    while (1) {
        currentChar = walker.currentChar()
        if (regType[currentChar]) {
            walker.nextChar()
        } else {
            break
        }
    }
    return walker.cut(beginIndex, walker.index)
}

exports = module.exports = readRegexp