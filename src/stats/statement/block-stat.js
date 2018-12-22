const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const Node = require('../node')
const BlockStatement = Node.BlockStatement
const statementList = require('../statement-list') 

/**
 * Block:{StatementList} 
 *
 */
function blockStat(walker) {
    walker.consumeToken(Token.LC)
    let node = BlockStatement()
    node.body = statementList(walker)
    walker.consumeToken(Token.RC)
    return node
}

exports = module.exports = blockStat

