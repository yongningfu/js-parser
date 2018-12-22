
const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const EmptyStatement = Node.EmptyStatement
/**
 * ;
 */
function emptyStat(walker) {
    walker.consumeToken(Token.SEMI)
    return EmptyStatement()
}

exports = module.exports = emptyStat
