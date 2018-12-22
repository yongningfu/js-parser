const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const WithStatement = Node.WithStatement
const Expression = require('../expr')
const parenthesizedExpr = Expression.parenthesizedExpr
const statement = require('./index')

/**
 * WithStatement ⇒ with ParenthesizedExpression Statement
 * @param {*} walker
 */
function withStat(walker) {
    walker.consumeToken(Token.WITH)
    const object = parenthesizedExpr(walker)
    return WithStatement(object, statement(walker))    
}

exports = module.exports = withStat
