exports = module.exports = assignExpr

const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const AssignmentExpressionNode = Node.AssignmentExpressionNode
const condExpr = require('./cond-expr')

/**
 * assign操作运算符
 */
const Token_Assign = {}
for (let tokenKey in Token) {
    if (tokenKey.indexOf('ASSIGN') === 0) {
        Token_Assign[Token[tokenKey]] = 1
    }
}

/**
 * AssignmentExpression
 *      ConditionalExpressionα,
 *   |  LeftSideExpressionα = AssignmentExpression
 *   |  LeftSideExpressionα CompoundAssignment AssignmentExpression
 * 
 * CompoundAssignment
 *       *=
 *   |  /=
 *   |  %=
 *   |  +=
 *   |  -=
 *   |  <<=
 *   |  >>=
 *   |  >>>=
 *   |  &=
 *   |  ^=
 *   |  |=
 * 
 * 这里把 LeftSideExpression 当成 AssignmentExpression
 */
function assignExpr(walker) {
    let node = condExpr(walker)
    let chr = walker.peekToken()
    if (Token_Assign[chr]) {
        walker.consumeToken()
        // assign 操作符号是二元运算符 而且是右结合性
        node = AssignmentExpressionNode(node, chr, assignExpr(walker))
    }
    return node
}





