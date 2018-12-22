exports = module.exports = primaryExpr
const constant = require('../../lex/constant')
const Token = constant.Token
const TOKEN_TYPE = constant.TOKEN_TYPE
const Node = require('../node')
const ArrayExpression = Node.ArrayExpression
const ObjectExpression = Node.ObjectExpression
const ThisExpression = Node.ThisExpression
const Property = Node.Property
const Literal = Node.Literal
const Identifier = Node.Identifier
const expr = require('./expr')
const assignExpr = require('./assign-expr')
const arrayExpr = require('./array-expr')
const objectExpr = require('./object-expr')
const identifierExpr = require('./identifier-expr')
const functionExpr = require('./function-expr')

/**
 * 
 *  primary记录常量表达式
 * 
 * -syntax
 *  this
 *  Identifier
 *  Literal
 *  ArrayLiteral
 *  ObjectLiteral
 *  *******(Expression)***** 放入left-side中
 * 
 */

function primaryExpr(walker) {
    let node = null
    const currentChar = walker.peekToken()
    let currentType = walker.currentToken && walker.currentToken.type
    switch (currentChar) {
        case Token.FUNCTION:
            node = functionExpr(walker)
            break
        // case Token.LP:
        //     walker.consumeToken()
        //     node = expr(walker)
        //     walker.consumeToken(Token.RP)
        //     return node
        case Token.LB:
            return arrayExpr(walker)
        case Token.LC:
            return objectExpr(walker)
        case Token.THIS:
            walker.consumeToken()
            node = ThisExpression()
            break
        case Token.NULL:
        case Token.FALSE:
        case Token.TRUE:
            walker.consumeToken()
            node = Literal(currentChar)
            break
        default:
            switch (currentType) {
                case TOKEN_TYPE.number:
                case TOKEN_TYPE.string:
                case TOKEN_TYPE.regexp:
                    walker.consumeToken()
                    node = Literal(currentChar)
                    break
                // case TOKEN_TYPE.identifier:
                //     node = identifierExpr(walker)
                //     break
                // default:
                //     // TODO error waing?
                //     node = void(0)
            }
     }
     return node
 }

