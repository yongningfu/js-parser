const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const ConditionalExpression = Node.ConditionalExpression
const assignExpr = require('./assign-expr')
const orExpr = require('./or-expr')
/**
 *  ConditionalExpression =>
 *     LogicalOrExpression
 *  |  LogicalOrExpression ? AssignmentExpression : AssignmentExpression
 * 
 *
 */
function condExpr(walker) {
    let node = orExpr(walker)
    if (walker.matchToken(Token.HOOK)) {
        const trueNode = assignExpr(walker)
        walker.consumeToken(Token.COLON)
        const falseNode = assignExpr(walker)
        node = ConditionalExpression(node, trueNode, falseNode)
    }
    return node
}

exports = module.exports = condExpr