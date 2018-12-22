const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const WhileStatement = Node.WhileStatement
const Expression = require('../expr')
const parenthesizedExpr = Expression.parenthesizedExpr
const statement = require('./index')

/**
 * WhileStatementω ⇒ while ParenthesizedExpression Statement
 * ParenthesizedExpression ⇒ ( Expression )
 *
 * @param {*} walker
 */
function whileStat(walker) {
    walker.consumeToken(Token.WHILE)
    const test = parenthesizedExpr(walker)
    return WhileStatement(test, statement(walker))
}

exports = module.exports = whileStat
