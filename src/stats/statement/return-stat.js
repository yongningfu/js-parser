const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const ReturnStatement = Node.ReturnStatement
const Expression = require('../expr')
const expr = Expression.expr


/**
 * ReturnStatement ⇒ return OptionalExpression
 * OptionalExpression ⇒
 *    Expression
 * |  «empty»
 *
 * @param {*} walker
 */
function returnStat(walker) {
    walker.consumeToken(Token.RETURN)
    const node = ReturnStatement()
    const currentToken = walker.currentToken
    // return js ASI问题
    if (currentToken
        && currentToken.type !== TOKEN_TYPE.endline
        && currentToken.character !== Token.SEMI
    ) {
        node.argument = expr(walker)
    }
    walker.matchToken(Token.SEMI)
    return node
}

exports = module.exports = returnStat

