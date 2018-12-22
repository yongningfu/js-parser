const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const bitOrExpr = require('./bit-or-expr')

/**
 * 
 * LogicalAndExpression
 *    BitwiseOrExpression
 * |  LogicalAndExpression && BitwiseOrExpression
 * 
 * @param {*} walker 
 */
function andExpr(walker) {
    let node = bitOrExpr(walker)
    while (walker.matchToken(Token.AND)) {
        node = BinaryExpression(node, Token.AND, bitOrExpr(walker))
    }
    return node
}

exports = module.exports = andExpr
