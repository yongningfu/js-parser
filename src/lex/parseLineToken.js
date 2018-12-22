const generatorCreateTokenWithLine = require('./createToken').generatorCreateTokenWithLine
const constant = require('./constant')
const TOKEN_TYPE = constant.TOKEN_TYPE
const tokenRegxp = constant.tokenRegxp
const RESERVED_WORD = constant.RESERVED_WORD
const Walker = require('./walker')
const readString = require('./readString')
const readRegexp = require('./readRegexp')
const isRegexStart = require('./isRegexStart')

const values = []        // 一个个token character值 不包括换行符
const LPStack = []
const LCStack = []
const LpPositionMap = {}  // 记录()位置信息 ） => (
const LcPositionMap= {}   // 记录{}位置

/**
 * 把每行代码的token解析出来
 *
 * @param {*} lineCode
 */
function parseLineToken(lineCode, lineno, context) {
    const createToken = generatorCreateTokenWithLine(lineno)
    const walker = new Walker(lineCode)
    let tokens = []
    let matchTokenStr
    let matchToken
    let firstChar

    while (matchTokenStr = walker.currentToken()) {

        if (!matchTokenStr) break /// 已经没有token可以匹配了 说明这行的token已经全部匹配出来了
        firstChar = matchTokenStr.charAt(0)
        if (/[a-z$_]/i.test(firstChar)) {
            const type = RESERVED_WORD.hasOwnProperty(matchTokenStr) ? TOKEN_TYPE.reserved : TOKEN_TYPE.identifier
            matchToken = createToken(type, matchTokenStr)
            tokens.push(matchToken)
            values.push(matchToken.character)
            walker.nextToken()
            continue
        } else if (/[0-9]/.test(firstChar)) {
            matchToken = createToken(TOKEN_TYPE.number, matchTokenStr)
            tokens.push(matchToken)
            values.push(matchToken.character)
            walker.nextToken()
            continue
        }

        switch(matchTokenStr) {
            case '\'':
            case '"':
                matchToken = createToken(TOKEN_TYPE.string, readString(walker))
                break
            case '//':
                walker.nextToken()
                matchToken = createToken(TOKEN_TYPE.comment, '//' + walker.cut(walker.index))
                walker.end()
                break
            case '/':
                if (isRegexStart(values, LpPositionMap, LcPositionMap)) {
                    matchToken = createToken(TOKEN_TYPE.regexp, readRegexp(walker))
                } else {
                    matchToken = createToken(TOKEN_TYPE.punc, firstChar)
                    walker.nextToken()
                }
                break
            default:
                if (matchTokenStr === '(') {
                    LPStack.push(values.length);
                } else if (matchTokenStr === ')') {
                    LpPositionMap[values.length] = LPStack.pop()
                } else if (matchTokenStr === '{') {
                    LCStack.push(values.length);
                } else if (matchTokenStr === '}') {
                    LcPositionMap[values.length] = LCStack.pop()
                }
                matchToken = createToken(TOKEN_TYPE.punc, firstChar)
                walker.nextToken()
                break
        }
        tokens.push(matchToken)
        values.push(matchToken.character)
    }
    return tokens;
}

exports = module.exports = parseLineToken