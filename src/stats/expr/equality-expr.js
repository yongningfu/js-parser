const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const relationalExpr = require('./relational-expr')

/**
 *  EqualityExpression
 *    RelationalExpression
 * |  EqualityExpression == RelationalExpression
 * |  EqualityExpression != RelationalExpression
 * |  EqualityExpression === RelationalExpression
 * |  EqualityExpression !== RelationalExpression
 * @param {*} walker 
 */
function equalityExpr(walker) {
    let node = relationalExpr(walker)
    let currentChar = ''
    while (1) {
        currentChar = walker.peekToken()
        switch (currentChar) {
            case Token.EQ:
            case Token.NE:
            case Token.SHEQ:
            case Token.SHNE:
                walker.consumeToken()
                node = BinaryExpression(node, currentChar, relationalExpr(walker))
                continue
        }
        break
    }
    return node
}

exports = module.exports = equalityExpr
