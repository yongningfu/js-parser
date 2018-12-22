const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const ForStatement = Node.ForStatement
const ForInStatement = Node.ForInStatement
const variableDecla = require('./variable-decla')
const Expression = require('../expr')
const expr = Expression.expr
const statement = require('./index')

/**
 * 
 * ForStatement ⇒
 *    for ( ForInitializer ; OptionalExpression ; OptionalExpression ) Statement   
 * |  for ( ForInBinding in Expression ) Statement
 * ForInitializer ⇒
 *    «empty»
 * |  Expression
 * |  var VariableDeclarationList
 * ForInBinding ⇒
 *    LeftSideExpression
 * |  var VariableDeclaration
 * 
 */
function forStat(walker) {
    walker.consumeToken(Token.FOR)
    walker.consumeToken(Token.LP)
    let init, update, test, left, right, body
    if (walker.peekToken() === Token.VAR) {
        const previousVariableDeclaSkipSemi = walker.context.variableDeclaSkipSemi
        walker.context.variableDeclaSkipSemi = false
        init = left = variableDecla(walker)
        walker.context.variableDeclaSkipSemi = previousVariableDeclaSkipSemi
    } else {
        const previousInfor = walker.context.inFor
        walker.context.inFor = true
        init = left = expr(walker)
        walker.context.inFor = previousInfor
    }

    // normal for statement
    if (walker.matchToken(Token.SEMI)) {
        test = expr(walker)
        walker.consumeToken(Token.SEMI)
        update = expr(walker)
    } else if (walker.matchToken(Token.IN)) {
        if (!left
            || (left.declarations && left.declarations.length !== 1)
            || (!left.declarations && left.type !== 'Identifier' && left.type !== 'MemberExpression')
        ) {
            throw 'parse for in error'
        }

        right = expr(walker)
        if (!right) throw 'for in parse errpr2'
    } else {
        throw 'for parse error'
    }

    walker.consumeToken(Token.RP)
    body = statement(walker)
    if (left && right) {
        return ForInStatement(left, right, body)
    }
    return ForStatement(init, test, update, body)
}

exports = module.exports = forStat
