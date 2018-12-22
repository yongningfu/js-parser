// 源码读取处理 以token/char对单位

const tokenRegxp = require('./constant').tokenRegxp

function Walker(source) {
    this.source = source
    this.len = this.source.length
    this.index = 0
    this.currentTokenMatch = {}   // cache
}

Walker.prototype.currentToken = function () {
    if (!this.currentTokenMatch.tokenStr) {
        const match = this.match(tokenRegxp)
        if (match) { 
            this.currentTokenMatch = {
                matchStr: match[0],
                tokenStr: match[1]
            }
        }
    }
    return this.currentTokenMatch.tokenStr
}

Walker.prototype.nextToken = function() {
    if (this.currentToken()) {
        this.go(this.currentTokenMatch.matchStr.length)
        this.currentTokenMatch = {}
    }
}

Walker.prototype.go = function(distance) {
    this.index += distance
}

Walker.prototype.end = function() {
    this.index = this.len
}

Walker.prototype.cut = function(start, end) {
    return this.source.slice(start, end)
}

Walker.prototype.match = function(reg) {
    reg.lastIndex = this.index
    const match = reg.exec(this.source)
    return match
}

Walker.prototype.currentChar = function() {
    return this.source.charAt(this.index)
}

Walker.prototype.nextChar = function () {
    this.go(1)
    this.currentTokenMatch = {} // 位置移动 清空缓存
}

exports = module.exports = Walker







