const constant = require('../lex/constant')
const TOKEN_TYPE = constant.TOKEN_TYPE

function Walker(tokens) {
    this.tokens = tokens || []
    // TODO 先暴力的去除 endline
    this.tokens = this.tokens.filter(function(token) {
        return token.type !== TOKEN_TYPE.endline
    })
    this.index = 0
    this.len = this.tokens.length
    this.currentToken = this.tokens[0]
    this.previousToken = null
    this.nextToken = this.tokens[1]
    this.context = {}
}

/**
 * 获取当前token字符串
 * @param {*} expectation 
 */
Walker.prototype.peekToken = function(expectation) {
    if (this.currentToken && this.currentToken.character !== expectation) {
        // TODO print err
    }
    return this.currentToken && this.currentToken.character
}

/**
 * 向前读取，吃掉一个token
 */
Walker.prototype.consumeToken = function(expectation) {
    if (expectation && this.currentToken && this.currentToken.character !== expectation) {
        console.log('expectation: ', expectation)
        console.log('current: ', this.currentToken.character)
        console.log('currentIndex: ', this.index)
        throw new Error('token不匹配')  // TODO
    }

    this.index++
    if (this.index >= this.len) {
        return
    }

    if (this.previousToken && this.previousToken.type === TOKEN_TYPE.comment) {
        // TODO
    }

    this.previousToken = this.tokens[this.index - 1]
    this.currentToken = this.tokens[this.index]
    this.nextToken = this.tokens[this.index + 1]

    if (this.currentToken.type === TOKEN_TYPE.comment) {
        this.consumeToken()
    }
}


/**
 * Token匹配
 * 匹配成功则向前读取一位，匹配失败则不读取
 * @param {*} exception 
 */
Walker.prototype.matchToken = function(exception) {
    if (this.currentToken && this.currentToken.character === exception) {
        this.consumeToken();
        return true
    }
    return false
}

exports = module.exports = Walker




