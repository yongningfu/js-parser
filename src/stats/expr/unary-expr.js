const constant = require('../../lex/constant')
const Token = constant.Token
const TOKEN_TYPE = constant.TOKEN_TYPE
const Node = require('../node')
const UnaryExpression = Node.UnaryExpression
const UpdateExpression = Node.UpdateExpression
const primaryExpr = require('./primary-expr')
const leftSideExpr = require('./left-side-expr')

/** 将primary归结为常量表达式 **/
function isPrimaryExpr(walker) {
    const currentToken = walker.currentToken
    if (!currentToken) return false
    const currentType = currentToken.type
    const currentChar = currentToken.character
    if ([Token.FUNCTION, Token.LB, Token.LC, Token.THIS,
        Token.NULL, Token.FALSE, Token.TRUE].indexOf(currentChar) >= 0
        || [TOKEN_TYPE.number, TOKEN_TYPE.string, TOKEN_TYPE.regexp].indexOf(currentType) >= 0) {
            return true
        }
    return false
}

// const postfixExpr = require('./postfix-expr')
// const memberExpr = require('./member-expr')


/**
 * 
 *  UnaryExpression :
 *      UpdateExpression  
 *      delete UnaryExpression 
 *      void UnaryExpression 
 *      typeof UnaryExpression 
 *      + UnaryExpression 
 *      - UnaryExpression
 *      ~ UnaryExpression
 *      ! UnaryExpression 
 *  UpdateExpression : 
 *      LeftHandSideExpression 
 *      LeftHandSideExpression [no LineTerminator here] ++
 *      LeftHandSideExpression [no LineTerminator here] -- 
 *      ++UnaryExpression[?Yield, ?Await]
 *      --UnaryExpression[?Yield, ?Await]
 * @param {*} walker 
 */
function unaryExpr(walker) {
    if (isPrimaryExpr(walker)) {
        return primaryExpr(walker)
    }
    let currentChar = walker.peekToken()
    switch (currentChar) {
        case Token.DELPROP:
        case Token.VOID:
        case Token.TYPEOF:
        case Token.ADD:
        case Token.SUB:
        case Token.BITNOT:
        case Token.NOT:
            walker.consumeToken()
            return UnaryExpression(currentChar, unaryExpr(walker), true)
        case Token.INC:
        case Token.DEC:
            walker.consumeToken()
            return UpdateExpression(currentChar, unaryExpr(walker), true)
        default:
            let node = leftSideExpr(walker)
            currentChar = walker.peekToken()
            if (currentChar === Token.INC || currentChar === Token.DEC) {
                if (node.type !== 'Identifier' && node.type !== 'MemberExpression') {
                    throw 'Invalid left-hand side expression '
                }
                walker.consumeToken()
                node = UpdateExpression(currentChar, node, false)
            }
            return node            
    }
}

exports = module.exports = unaryExpr


