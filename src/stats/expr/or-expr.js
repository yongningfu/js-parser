const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const LogicalExpression = Node.LogicalExpression
const andExpr = require('./and-expr')

/**
 *  LogicalOrExpression
 *      LogicalAndExpression
 *   |  LogicalOrExpression || LogicalAndExpression
 *
 * @param {*} walker
 */
function orExpr(walker) {
    let node = andExpr(walker)
    while (walker.matchToken(Token.OR)) {
        // || 操作符号是二元运算符 而且是左结合性
        node = LogicalExpression(node, Token.OR, andExpr(walker))
    }
    return node
}

exports = module.exports = orExpr
