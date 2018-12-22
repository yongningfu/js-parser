const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const ContinueStatement = Node.ContinueStatement
const Expression = require('../expr') 
const identifierExpr = Expression.identifierExpr

/**
 * ContinueStatement ⇒ continue OptionalLabel
 * OptionalLabel ⇒
 *    «empty»
 * |  Identifier
 * 
 * @param {*} walker 
 * 
 */
function continueStat(walker) {
    // TODO continue ASI问题
    walker.consumeToken(Token.CONTINUE)
    const node = ContinueStatement()
    if (walker.currentToken && walker.currentToken.type === TOKEN_TYPE.identifier) {
        node.label = identifierExpr(walker)
    }
    walker.matchToken(Token.SEMI)
    return node
}

exports = module.exports = continueStat

