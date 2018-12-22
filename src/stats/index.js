const Walker = require('./walker')
const constant = require('../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const statementList = require('./statement-list')

function stats(tokens) {
    const walker = new Walker(tokens)
    const programNode =  { type: 'Program', body: []}
    programNode.body = statementList(walker)
    return programNode
}

exports = module.exports = stats

