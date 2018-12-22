const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const unaryExpr = require('./unary-expr')

/**
 * MultiplicativeExpression ⇒
 *    UnaryExpression
 * |  MultiplicativeExpression * UnaryExpression
 * |  MultiplicativeExpression / UnaryExpression
 * |  MultiplicativeExpression % UnaryExpression
 *
 * @param {*} walker
 */
function mulExpr(walker) {
    let node = unaryExpr(walker)
    let currentChar = ''
    while (1) {
        currentChar = walker.peekToken()
        switch (currentChar) {
            case Token.MUL:
            case Token.DIV:
            case Token.MOD:
                walker.consumeToken()
                node = BinaryExpression(node, currentChar, unaryExpr(walker))
                continue
        }
        break
    }
    return node
}

exports = module.exports = mulExpr
