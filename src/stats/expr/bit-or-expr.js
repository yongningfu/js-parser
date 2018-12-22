const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const bitXorExpr = require('./bit-xor-expr')

/**
 *  BitwiseOrExpression
 *     BitwiseXorExpression
 *  |  BitwiseOrExpression | BitwiseXorExpression
 * 
 * @param {*} walker 
 */
function bitOrExpr(walker) {
    let node = bitXorExpr(walker)
    while (walker.matchToken(Token.BITOR)) {
        node = BinaryExpression(node, Token.BITOR, bitXorExpr(walker))
    }
    return node
}

exports = module.exports = bitOrExpr