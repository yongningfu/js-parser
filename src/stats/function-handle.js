const constant = require('../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const statement = require('./statement')

/**
 *
 * 函数定义比较特殊 分为函数声明和函数表达式
 * 默认为函数定义语句
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
function functionHandle(walker) {
    walker.consumeToken(Token.FUNCTION);
    let currentToken = walker.currentToken
    if (!currentToken) {
        throw 'function parse error'
    }

    // 函数定义必须有名称
    if (walker.context.functionDefinition === true
        && currentToken.type !== TOKEN_TYPE.identifier) {
            throw 'functionDefinition must have a identifier'
    }    
}

exports = module.exports = functionDefinition

