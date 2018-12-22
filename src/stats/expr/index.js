const expr = require('./expr')
const identifierExpr = require('./identifier-expr')
const assignExpr = require('./assign-expr')
const Walker = require('../walker')
const parenthesizedExpr = require('./parenthesized-expr')
function parseExpr(tokens) {
    const walker = new Walker(tokens)
    return expr(walker)
}
exports = module.exports = {
    parseExpr,
    identifierExpr,
    assignExpr,
    expr,
    parenthesizedExpr
}

