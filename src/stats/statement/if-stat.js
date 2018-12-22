const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const IfStatement = Node.IfStatement
const statement = require('./index')
const Expression = require('../expr')
const expr = Expression.expr

/**
 *
 * IfStatementfull ⇒
 *  if ParenthesizedExpression Statementfull
 * |  if ParenthesizedExpression StatementnoShortIf else Statementfull
 * IfStatementnoShortIf ⇒ if ParenthesizedExpression StatementnoShortIf else StatementnoShortIf
 * 
 * @param {*} walker
 */
function ifStat(walker) {
    walker.consumeToken(Token.IF)
    const node = IfStatement(expr(walker), statement(walker))
    if (walker.matchToken(Token.ELSE)) {
        node.alternate = statement(walker)
    }
    return node
}

exports = module.exports = ifStat

