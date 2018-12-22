const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const NewExpression = Node.NewExpression
const assignExpr = require('./assign-expr')


/**
 * 
 * Arguments
 *    ( )
 * |  ( ArgumentList )
 * ArgumentList
 *    AssignmentExpressionn
 * |  ArgumentList , AssignmentExpression
 *
 * @param {*} walker 
 */
function argumentExpr(walker) {
    let node = []
    let currentChar = walker.peekToken()
    if (currentChar === Token.LP) {
        walker.consumeToken()
        currentChar = walker.peekToken()
        while (currentChar && currentChar !== Token.RP) {
            node.push(assignExpr(walker))
            // 读取一个AssignmentExpressionn后, 下面的一个只能是 ) 或者 ,
            currentChar = walker.peekToken()
            if (currentChar !== Token.RP) {
                walker.consumeToken(Token.COMMA)
                currentChar = walker.peekToken()
            }
        }
        walker.consumeToken(Token.RP)
    }

    return node
}

exports = module.exports = argumentExpr

