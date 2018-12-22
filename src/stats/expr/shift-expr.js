const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const addExpr = require('./add-expr')

/**
 * ShiftExpression
 *    AdditiveExpression
 * |  ShiftExpression << AdditiveExpression
 * |  ShiftExpression >> AdditiveExpression
 * |  ShiftExpression >>> AdditiveExpression
 * @param {*} walker 
 */
function shiftExpr(walker) {
    let node = addExpr(walker)
    let currentChar = ''
    while (1) {
        currentChar = walker.peekToken()
        switch (currentChar) {
            case Token.LSH:
            case Token.URSH:
            case Token.RSH:
                walker.consumeToken()
                node = BinaryExpression(node, currentChar, addExpr(walker))
                continue
        }
        break
    }
    return node
}

exports = module.exports = shiftExpr
