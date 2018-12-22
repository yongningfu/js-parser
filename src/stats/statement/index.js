exports = module.exports = statement

const constant = require('../../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const Token = constant.Token
const labeledStat = require('./labeled-stat')
const blockStat = require('./block-stat')
const emptyStat = require('./empty-stat')
const variableDecla = require('./variable-decla')
const continueStat = require('./continue-stat')
const breakStat = require('./break-stat')
const returnStat = require('./return-stat')
const functionDefinition = require('./function-definition')
const ifStat = require('./if-stat')
const forStat = require('./for-stat')
const whileStat = require('./while-stat')
const doStat = require('./do-stat')
const switchStat = require('./switch-stat')
const expressionStat = require('./expression-stat')
const withStat = require('./with-stat')
const tryStat = require('./try-stat')

/**
 * statement 统一负责 Statements and Declarations
 * 
 *statement => 
 *   BlockStatement
 *   EmptyStatement
 *   ExpressionStatement
 *   IfStatement
 *   BreakableStatement
 *   ContinueStatement
 *   BreakStatement
 *   ReturnStatement
 *   WithStatement
 *   LabelledStatement
 *   ThrowStatement
 *   TryStatement
 *   DebuggerStatement
 * 
 *   FunctionDeclaration
 *   VariableDeclaration
 * 
 * @param {*} walker
 */
function statement(walker) {
    const currentToken = walker.currentToken
    const currentChar = walker.peekToken()
    const nextToken = walker.nextToken

    if (currentToken.type === TOKEN_TYPE.identifier && nextToken.character === ':') {
        return labeledStat(walker)
    }

    switch (currentChar) {
        case Token.LC:
            return blockStat(walker)
        case Token.SEMI:
            return emptyStat(walker)
        case Token.VAR:
            return variableDecla(walker)
        case Token.CONTINUE:
            return continueStat(walker)
        case Token.BREAK:
            return breakStat(walker)
        case Token.RETURN:
            return returnStat(walker)
        case Token.FUNCTION:
            return functionDefinition(walker)
        case Token.IF:
            return ifStat(walker)
        case Token.FOR:
            return forStat(walker)
        case Token.WHILE:
            return whileStat(walker)
        case Token.DO:
            return doStat(walker)
        case Token.SWITCH:
            return switchStat(walker)
        case Token.WITH:
            return withStat(walker)
        case Token.TRY:
            return tryStat(walker)
        default:
            return expressionStat(walker)
    }
}

