const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const LabeledStatement = Node.LabeledStatement
const statement = require('./index')
const Expression = require('../expr')
const identifierExpr = Expression.identifierExpr

/**
 * LabeledStatement => Identifier : Statement
 */

function LabeledStat(walker) {
    let node = LabeledStatement(identifierExpr(walker))
    walker.consumeToken(Token.COLON)
    node.body = statement(walker)
    walker.matchToken(Token.SEMI)
    return node
}

exports = module.exports = LabeledStat

