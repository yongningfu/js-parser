const constant = require('../../lex/constant')
const Token = constant.Token
const TOKEN_TYPE = constant.TOKEN_TYPE
const Node = require('../node')
const ObjectExpression = Node.ObjectExpression
const Property = Node.Property
const Literal = Node.Literal
const Identifier = Node.Identifier
const assignExpr = require('./assign-expr')
const leftSideExpr = require('./left-side-expr')

/**
 * 
 * ObjectLiteral ⇒
 *    { }
 * |  { FieldList }
 * FieldList ⇒
 *    LiteralField
 * |  FieldList , LiteralField
 * LiteralField ⇒ Identifier : AssignmentExpressionnorm
 * 
 * @param {*} walker
 */
function objectExpr(walker) {
    let currentChar = walker.peekToken()
    let currentType = ''
    let node = null
    let keyNode = null
    let valueNode = null
    let propertyNode = null
    if (currentChar === Token.LC) {
        walker.consumeToken()
        node = ObjectExpression()
        while ((currentChar = walker.peekToken()) && currentChar !== Token.RC) {
            currentType = walker.currentToken.type
            // 当type为以下几个特定的常量时
            if ([TOKEN_TYPE.number, TOKEN_TYPE.string, TOKEN_TYPE.identifier]
                .indexOf(currentType) >= 0) {
                keyNode = Literal(currentChar)
                walker.consumeToken(Token.COLON)
                propertyNode = Property(keyNode, false, assignExpr(walker))
            // 类似于 {[a.c]:1}
            } else if (currentChar === Token.LB) {
                walker.consumeToken()
                keyNode = leftSideExpr(walker)
                walker.consumeToken(Token.RB)
                walker.consumeToken(Token.COLON)
                propertyNode = Property(keyNode, true, assignExpr(walker))
            } else {
                throw 'object parse error1'
            }

            // 这种情况下，object里面必须有值 和 array不一样
            if (!propertyNode) {
                throw 'object parse error2'
            }

            node.properties.push(propertyNode)
            propertyNode = null
            // 读取一个LiteralField后, 下面的一个只能是 } 或者 ,
            if (walker.peekToken() !== Token.RC) {
                walker.consumeToken(Token.COMMA)
            }
        }
        walker.consumeToken(Token.RC)
    }
    return node
}

exports = module.exports = objectExpr
