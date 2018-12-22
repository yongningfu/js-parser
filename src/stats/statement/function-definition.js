const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const FunctionDeclaration = Node.FunctionDeclaration
const Expression = require('../expr')
const identifierExpr = Expression.identifierExpr
const blockStat = require('./block-stat')

/**
 *
 * 函数定义比较特殊 分为函数声明和函数表达式
 * 这里为函数定义语句  NamedFunction
 * 
 * FunctionDefinition ⇒ NamedFunction
 * AnonymousFunction ⇒ function FormalParametersAndBody
 * NamedFunction ⇒ function Identifier FormalParametersAndBody
 * FormalParametersAndBody ⇒ ( FormalParameters ) { TopStatements }
 * FormalParameters ⇒
 *   «empty»
 * |  FormalParametersPrefix
 * FormalParametersPrefix ⇒
 * FormalParameter
 * |  FormalParametersPrefix , FormalParameter
 * FormalParameter ⇒ Identifier
 * 
 * @param {*} walker
 */
function functionDefinition(walker) {
    walker.consumeToken(Token.FUNCTION);
    // 函数定义为NamedFunction 必须有名称
    const idNode = identifierExpr(walker)
    const node = FunctionDeclaration(idNode)
    walker.consumeToken(Token.LP)
    while (walker.peekToken() && walker.peekToken() !== Token.RP) {
        node.params.push(identifierExpr(walker))
        // // 每个identifier后面必须是 ) 或者 , 不是 ) 则必须是 ,
        if (walker.peekToken() !== Token.RP) {
            walker.consumeToken(Token.COMMA)
        }
    }
    walker.consumeToken(Token.RP)
    node.body = blockStat(walker)
    return node
}

exports = module.exports = functionDefinition



