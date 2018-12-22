
exports = module.exports = statementList
const constant = require('../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const statement = require('./statement')

/**
 * StatementList
 * StatementList 的结束条件为 } 或者 程序结束
 * 当程序结束情况时 为根程序
 * 当为 } 时 为 block情况
 */
function statementList(walker) {
    const node = []
    let currentToken = null
    while (1) {
        currentToken = walker.currentToken
        if (!currentToken) {
            throw 'error'
        }
        if (currentToken.character === Token.RC || currentToken.type === TOKEN_TYPE.end) {
            break
        }
        node.push(statement(walker))
    }
    return node
}


