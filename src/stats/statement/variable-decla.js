const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const VariableDeclaration = Node.VariableDeclaration
const VariableDeclarator = Node.VariableDeclarator
const Expression = require('../expr')
const identifierExpr = Expression.identifierExpr
const assignExpr = Expression.assignExpr



/**
 *  VariableDefinition ⇒ var VariableDeclarationList
 *  VariableDeclarationList
 *     VariableDeclaration
 *  |  VariableDeclarationList , VariableDeclaration
 *  VariableDeclaration ⇒ Identifier VariableInitializer
 *  VariableInitializer ⇒
 *     «empty»
 *  |  = AssignmentExpression
 *
 * @param {*} walker
 */
function variableDecla(walker) {
    walker.consumeToken(Token.VAR)
    const node = VariableDeclaration([], 'var')
    let idNode = null
    let initNode = null
    do {
        idNode = identifierExpr(walker)
        if (walker.peekToken() === Token.ASSIGN) {
            walker.consumeToken()
            initNode = assignExpr(walker)
        }
        node.declarations.push(VariableDeclarator(idNode, initNode))
        initNode = null
    } while (walker.matchToken(Token.COMMA))

    // 某些情况下 后面的分号为一个特定的标识 不能跳过如 for中
    if (walker.context.variableDeclaSkipSemi !== false) {
        walker.matchToken(Token.SEMI)
    }
    return node
}

exports = module.exports = variableDecla


