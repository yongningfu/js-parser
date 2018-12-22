/**
 * 
 * @param {*} walker 
 */
function readString(walker) {
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
    return walker.cut(beginIndex, walker.index)
}

exports = module.exports = readString