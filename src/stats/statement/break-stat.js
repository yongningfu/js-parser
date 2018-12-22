const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const BreakStatement = Node.BreakStatement
const Expression = require('../expr') 
const identifierExpr = Expression.identifierExpr

/**
 * 
 * BreakStatement ⇒ break OptionalLabel
 * OptionalLabel ⇒
 *  «empty»
 *  | Identifier
 * @param {*} walker 
 * 
 */
function breakStat(walker) {
    walker.consumeToken(Token.BREAK)
    const node = BreakStatement()
    if (walker.currentToken && walker.currentToken.type === TOKEN_TYPE.identifier) {
        node.label = identifierExpr(walker)
    }
    walker.matchToken(Token.SEMI)
    return node
}

exports = module.exports = breakStat


