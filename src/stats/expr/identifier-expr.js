const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Node = require('../node')
const Identifier = Node.Identifier

/**
* 抽离出identifier 因为很多地方必须确定使用的是identifier
 */
function identifierExpr(walker) {
    let currentToken = walker.currentToken
    if (!currentToken || currentToken.type !== TOKEN_TYPE.identifier) {
        throw 'must be identifier'
    }
    walker.consumeToken()
    return Identifier(currentToken.character)
}

exports = module.exports = identifierExpr

