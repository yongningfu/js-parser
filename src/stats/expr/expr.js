exports = module.exports = expr
const constant = require('../../lex/constant')
const assignExpr = require('./assign-expr')
const Node = require('../node')
const SequenceExpressionNode = Node.SequenceExpressionNode
const Token = constant.Token

/**
 * Expressions
 * Expressions =>
 *    AssignmentExpression
 *  | Expressions, AssignmentExpression
 */
function expr(walker) {
    let node = assignExpr(walker)
    if (walker.matchToken(Token.COMMA)) {
        node = new SequenceExpressionNode([node])
        do {
            node.expressions.push(assignExpr(walker))
        } while (walker.matchToken(Token.COMMA))
    }
    return node
}








