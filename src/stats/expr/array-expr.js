const constant = require('../../lex/constant')
const Token = constant.Token
const TOKEN_TYPE = constant.TOKEN_TYPE
const Node = require('../node')
const ArrayExpression = Node.ArrayExpression
const assignExpr = require('./assign-expr')
/** 
 *  ArrayLiteral ⇒
 *     [ ]
 *  |  [ ElementList ]
 *  ElementList ⇒
 *      LiteralElement
 *  |  ElementList , LiteralElement
 *  LiteralElement ⇒ AssignmentExpressionnorm
 * 
 * 情况
 * 1. []
 * 2. [x,y]
 * 3. [x,y,,,]
 * 4. [,,]
 */

function arrayExpr(walker) {
    let node = null
    let currentChar = walker.peekToken()
    if (currentChar === Token.LB) {
        walker.consumeToken()
        node = ArrayExpression()
        currentChar = walker.peekToken()
        // currentChar存在才循环！！！，而且 currentChar !== Token.RB, 
        while (currentChar && currentChar !== Token.RB) {
            node.elements.push(assignExpr(walker))

            // 读取一个LiteralElement后, 下面的一个只能是 ] 或者 ,
            currentChar = walker.peekToken()
            if (currentChar !== Token.RB) {
                walker.consumeToken(Token.COMMA)
                currentChar = walker.peekToken()
            }
        }
        walker.consumeToken(Token.RB)
    }
    return node
}

 exports = module.exports = arrayExpr

