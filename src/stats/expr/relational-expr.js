const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const BinaryExpression = Node.BinaryExpression
const shiftExpr = require('./shift-expr')

/**
 * RelationalExpression
 *    ShiftExpression
 * |  RelationalExpression < ShiftExpression
 * |  RelationalExpression > ShiftExpression
 * |  RelationalExpression <= ShiftExpression
 * |  RelationalExpression >= ShiftExpression
 * |  RelationalExpression instanceof ShiftExpressionnormal
 * |  RelationalExpression in ShiftExpression

 *
 * @param {*} walker
 */
function relationalExpr(walker) {
    let node = shiftExpr(walker)
    let currentChar = ''
    while (1) {
        currentChar = walker.peekToken()
        switch (currentChar) {
            // in 的情况特殊
            // 如果for中 第一个表达式含有in 那么这个for 按照 forIn解析 而不是 for
            // 例如 for (a in b; c; d) 实际会按照for in 解析 而不是 for (;;)
            // 所以 遇到in的时候 不能往下走解析成 关系表达式
            case Token.IN:
                if (walker.context.inFor === true) break
            case Token.INSTANCEOF:
            case Token.LE:
            case Token.LT:
            case Token.GE:
            case Token.GT:
                walker.consumeToken()
                node = BinaryExpression(node, currentChar, shiftExpr(walker))
                continue
        }
        break
    }
    return node
}

exports = module.exports = relationalExpr



