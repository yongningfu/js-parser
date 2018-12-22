const constant = require('../../lex/constant')
const Token = constant.Token
const expr = require('./expr')

/**
 * ParenthesizedExpression ⇒ ( Expression )
 * 其实根本没有括号表达式 括号表达式的值就括号里面的表达式
 *
 * @param {*} walker
 */
function parenthesizedExpr(walker) {
    walker.consumeToken(Token.LP)
    const node = expr(walker)
    walker.consumeToken(Token.RP)
    return node
}

exports = module.exports = parenthesizedExpr


