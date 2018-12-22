const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const SwitchStatement = Node.SwitchStatement
const SwitchCase = Node.SwitchCase
const statement = require('./index')
const Expression = require('../expr')
const expr = Expression.expr
const parenthesizedExpr = Expression.parenthesizedExpr

/**
 * SwitchStatement ⇒
 *   switch ParenthesizedExpression { }
 * | switch ParenthesizedExpression { CaseGroups LastCaseGroup }
 * CaseGroups ⇒
 *   «empty»
 * |  CaseGroups CaseGroup
 * CaseGroup ⇒ CaseGuards BlockStatementsPrefix
 * LastCaseGroup ⇒ CaseGuards BlockStatements
 * CaseGuards ⇒
 *   CaseGuard
 * | CaseGuards CaseGuard
 * CaseGuard ⇒
 *   case Expression:
 * | default :
 *
 * @param {*} walker
 */
function switchStat(walker) {
    walker.consumeToken(Token.SWITCH)
    const node = SwitchStatement()
    node.discriminant = parenthesizedExpr(walker)
    walker.consumeToken(Token.LC)
    let currentChar, caseNode
    while ((currentChar = walker.peekToken()) && currentChar !== Token.RC) {
        if (currentChar === Token.CASE || currentChar === Token.DEFAULT) {
            walker.consumeToken()
            caseNode = SwitchCase(null)
            if (currentChar === Token.CASE) {
                caseNode.test = expr(walker)
                if (!caseNode.test) throw 'case label must be a expr'
            }
            walker.consumeToken(Token.COLON)
            node.cases.push(caseNode)
            while (
                    (currentChar = walker.peekToken())
                    && currentChar !== Token.RC
                    && currentChar !== Token.CASE
                    && currentChar !== Token.DEFAULT) {
                        caseNode.consequent.push(statement(walker))
                    }
            continue
        }
        throw 'case parse error'
    }

    walker.consumeToken(Token.RC)
    return node
}

exports = module.exports = switchStat
