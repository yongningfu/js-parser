const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const equalityExpr = require('./equality-expr')

/**
 * BitwiseAndExpression
 *    EqualityExpression
 * |  BitwiseAndExpression & EqualityExpression
 * @param {*} walker 
 */
function bitAndExpr(walker) {
    let node = equalityExpr(walker)
    while (walker.matchToken(Token.BITAND)) {
        node = BinaryExpression(node, Token.BITAND, equalityExpr(walker))
    }
    return node
}

exports = module.exports = bitAndExpr