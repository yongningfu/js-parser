const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const bitAndExpr = require('./bit-and-expr')

/**
 * BitwiseXorExpression
 *    BitwiseAndExpression
 * |  BitwiseXorExpression ^ BitwiseAndExpression
 *
 * @param {*} walker
 */
function bitXorExpr(walker) {
    let node = bitAndExpr(walker)
    while (walker.matchToken(Token.BITXOR)) {
        node = BinaryExpression(node, Token.BITXOR, bitAndExpr(walker))
    }
    return node
}

exports = module.exports = bitXorExpr

