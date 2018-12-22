const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const DoWhileStatement = Node.DoWhileStatement
const Expression = require('../expr')
const parenthesizedExpr = Expression.parenthesizedExpr
const statement = require('./index')

/**
 * DoStatement ⇒ do Statementfull while ParenthesizedExpression
 * @param {*} walker 
 */
function doStat(walker) {
    walker.consumeToken(Token.DO)
    const body = statement(walker)
    walker.consumeToken(Token.WHILE)
    return DoWhileStatement(parenthesizedExpr(walker), body)
}

exports = module.exports = doStat
