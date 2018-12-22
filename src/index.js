const lex = require('./lex')
const stats = require('./stats')

function parser(source) {
    return stats(lex(source))
}

exports = module.exports =  {
    tokenize: lex,
    parser
}
