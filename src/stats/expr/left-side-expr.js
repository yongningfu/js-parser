exports = module.exports = leftSideExpr
const constant = require('../../lex/constant')
const Token = constant.Token
const TOKEN_TYPE = constant.TOKEN_TYPE
const Node = require('../node')
const NewExpression = Node.NewExpression
const MemberExpression = Node.MemberExpression
const CallExpression = Node.CallExpression
// const unaryExpr = require('./unary-expr')
const argumentExpr = require('./argument-expr')
const assignExpr = require('./assign-expr')
const expr = require('./expr')
const identifierExpr = require('./identifier-expr')
const parenthesizedExpr = require('./parenthesized-expr')

/**
 *  LeftHandSideExpression
 *      NewExpression
 *      CallExpression
 *  NewExpression
 *      MemberExpression
 *      newNewExpression
 *  CallExpression
 *      CoverCallExpressionAndAsyncArrowHead
 *      SuperCall
 *      CallExpression  Arguments
 *      CallExpression  [Expression]
 *      CallExpression  .IdentifierName
 *      CallExpression  TemplateLiteral
 *  MemberExpression
 *      PrimaryExpression
 *      FunctionExpression   // 也可以放在 primaryExpr里面
 *      MemberExpression  [Expression]
 *      MemberExpression  .IdentifierName
 *      MemberExpression  TemplateLiteral
 *      SuperProperty
 *      MetaProperty
 *      new  MemberExpression  Arguments
 * 
 * 对 left-side expr做了一下修改 把primary提取出去
 * 而且把primary定义为 常量表达式，直接放在unary expr中
 * 把 primary中的 (expr) 提取到leftSideExpr中
 * 
 * 总结下来 leftSideExpr的格式应该是
 * 1. x
 * 2. x.x
 * 3. x[x]
 * 4. x.x[x]()
 * 5. new x.x[x]()
 * 6. (expression)
 * 
 * leftSideExpr 应该理解成可以放在左边的表达式（不是 = 左边）
 * 而是 这个表达式 右边可以跟 .[ (
 * 
 * @param {*} walker
 * 
 */
function leftSideExpr(walker) {
    let currentToken = walker.currentToken
    if (!currentToken) return void(0)

    let currentChar = currentToken.character
    let currentType = currentToken.type
    let node
    switch (currentChar) {
        case Token.NEW:
            walker.consumeToken()
            const previousLeftSideExprAllowCall = walker.context.leftSideExprAllowCall
            walker.context.leftSideExprAllowCall = false
            const functionReference = leftSideExpr(walker)
            if (!functionReference) throw 'new expr parse error'
            walker.context.leftSideExprAllowCall = previousLeftSideExprAllowCall
            node = NewExpression(functionReference, argumentExpr(walker))
            break
        case Token.LP:
            node = parenthesizedExpr(walker)
            break
        default:
            if (currentType === TOKEN_TYPE.identifier) {
                node = identifierExpr(walker)
            } else {
                return void(0)
            }
    }

    const leftSideLinkPunc = {
        [Token.DOT]: true,
        [Token.LB]: true,
        [Token.LP]: walker.context.leftSideExprAllowCall === false ? false : true
    }
    

    // left side 后面还有其他的链接符号
    while ((currentChar = walker.peekToken()) && leftSideLinkPunc[currentChar]) {
        switch (currentChar) {
            case Token.DOT:
                walker.consumeToken()
                node = MemberExpression(false, node, identifierExpr(walker))
                break
            case Token.LB:
                walker.consumeToken()
                node = MemberExpression(true, node, assignExpr(walker))
                walker.consumeToken(Token.RB)
                break
            case Token.LP:
                walker.consumeToken()
                node = CallExpression(node, argumentExpr(walker))
                break
        }
    }

    if (walker.context.leftSideExprCanAssign === true) {
        if (node.type !== 'Identifier' && node.type !== 'MemberExpression') {
            throw 'Invalid left-hand side expression '
        }
    }
    return node
}
