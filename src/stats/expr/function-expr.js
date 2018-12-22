const constant = require('../../lex/constant')
const Token = constant.Token
const Node = require('../node')
const FunctionExpression = Node.FunctionExpression
const identifierExpr = require('./identifier-expr')
const blockStat = require('../statement/block-stat')

/**
 * TODO 和 function definition 代码重复大
 * 函数定义比较特殊 分为函数声明和函数表达式
 * 这里为函数表达式  NamedFunction || AnonymousFunction
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
function functionExpr(walker) {
    walker.consumeToken(Token.FUNCTION);
    const node = FunctionExpression()
    if (walker.peekToken() !== Token.LP) {
        node.id = identifierExpr(walker)        
    }

    walker.consumeToken(Token.LP)
    while (walker.peekToken() && walker.peekToken() !== Token.RP) {
        node.params.push(identifierExpr(walker))
        // 每个identifier后面必须是 ) 或者 , 不是 ) 则必须是 ,
        if (walker.peekToken() !== Token.RP) {
            walker.consumeToken(Token.COMMA)
        }
    }
    walker.consumeToken(Token.RP)
    node.body = blockStat(walker)
    return node
}

exports = module.exports = functionExpr

