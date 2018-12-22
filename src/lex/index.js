const constant = require('./constant')
const tokenRegxp = constant.tokenRegxp
const TOKEN_TYPE = constant.TOKEN_TYPE
const createToken = require('./createToken').createToken
const parseLineToken = require('./parseLineToken')

function lex(sourceCode) {
    let source = sourceCode.replace(/\r/g, '').split('\n')
    let line = 0
    let code = ''        // code 为一行的内容 一行一行的处理
    const lineLength = source.length
    let tokens = []

    let lineTokens = [];
    for (; line < lineLength; line++) {
        code = source[line]
        if (code && code.length > 0) {
            lineTokens = parseLineToken(code, line + 1)
            tokens = tokens.concat(lineTokens)
        }
        tokens.push(createToken(TOKEN_TYPE.endline))
    }
    tokens.push(createToken(TOKEN_TYPE.end))
    return tokens
}

exports = module.exports = lex