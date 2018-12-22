const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const TryStatement = Node.TryStatement
const CatchClause = Node.CatchClause
const Expression = require('../expr')
const parenthesizedExpr = Expression.parenthesizedExpr
const identifierExpr = Expression.identifierExpr
const blockStat = require('./block-stat')


/**
 * TryStatement ⇒
 *    try Block CatchClause
 * |  try Block FinallyClause
 * |  try Block CatchClauses FinallyClause

 * CatchClause ⇒ catch ( Identifier ) Block
 * FinallyClause ⇒ finally Block
 *
 * @param {*} walker
 */
function tryStat(walker) {
    walker.consumeToken(Token.TRY)
    const node = TryStatement()
    node.block = blockStat(walker)
    if (walker.matchToken(Token.CATCH)) {
        walker.consumeToken(Token.LP)
        node.handler = CatchClause()
        node.handler.param =  identifierExpr(walker)
        walker.consumeToken(Token.RP)
        node.handler.body = blockStat(walker)
    }

    if (walker.matchToken(Token.FINALLY)) {
        node.finalizer = blockStat(walker)
    }
    return node
}

exports = module.exports = tryStat

