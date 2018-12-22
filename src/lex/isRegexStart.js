/**
 * 文件主体逻辑来源于esprima的逻辑
 * esprima这里判断有点问题，比如case if((1)) /aa/ 这里已经做了修复
 */

// A function following one of those tokens is an expression.
function beforeFunctionExpression(t) {
    return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
        'return', 'case', 'delete', 'throw', 'void',
        // assignment operators
        '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
        '&=', '|=', '^=', ',',
        // binary/unary operators
        '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
        '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
        '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
}

// Determine if forward slash (/) is an operator or part of a regular expression
// https://github.com/mozilla/sweet.js/wiki/design

/**
 * @param {*} values 除去换行符的当前全部tokens的character
 * @param {*} LpPositionMap  // 记录()位置信息 ） => (
 * @param {*} LcPositionMap  // 记录{}位置信息 } =>  {
 * @returns
 */
function isRegexStart(values, LpPositionMap, LcPositionMap) {

    const previousIndex = values.length - 1
    const previous = values[previousIndex]
    let regex = (previous == null);

    switch (previous) {
        case 'this':
        case ']':
            regex = false;
            break;

        case ')':
            const paren = LpPositionMap[previousIndex]
            const keyword = values[paren - 1]
            regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
            break;

        case '}':
            // Dividing a function by anything makes little sense,
            // but we have to check for that.
            regex = true;
            const curly = LcPositionMap[previousIndex]
            if (values[curly - 3] === 'function') {
                // Anonymous function, e.g. function(){} /42
                const check = values[curly - 4];
                regex = check ? !beforeFunctionExpression(check) : false;
            } else if (values[curly - 4] === 'function') {
                // Named function, e.g. function f(){} /42/
                const check = values[curly - 5];
                regex = check ? !beforeFunctionExpression(check) : true;
            }
            break;
        default:
            break;
    }

    return regex;
}

exports = module.exports = isRegexStart