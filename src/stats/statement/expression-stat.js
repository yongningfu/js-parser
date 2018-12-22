const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const ExpressionStatement = Node.ExpressionStatement
const Expression = require('../expr')
const expr = Expression.expr

/**
 * ExpressionStatement ⇒ Expressionin
 * 
 * @param {*} walker
 */
function expressionStat(walker) {
    return ExpressionStatement(expr(walker))
}

exports = module.exports = expressionStat

