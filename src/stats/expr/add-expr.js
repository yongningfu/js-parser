const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const mulExpr = require('./mul-expr')

/**
 * AdditiveExpression ⇒
 *    MultiplicativeExpressionα
 * |  AdditiveExpression + MultiplicativeExpression
 * |  AdditiveExpression - MultiplicativeExpression
 *
 * @param {*} walker
 */
function addExpr(walker) {
    let node = mulExpr(walker)
    let currentChar = ''
    while (1) {
        currentChar = walker.peekToken()
        switch (currentChar) {
            case Token.ADD:
            case Token.SUB:
                walker.consumeToken()
                node = BinaryExpression(node, currentChar, mulExpr(walker))
                continue
        }
        break
    }
    return node
}

exports = module.exports = addExpr

