function SequenceExpressionNode(expressions) {
    return {
        type: 'SequenceExpression',
        expressions: expressions || [],
    }
}

//TODO BinaryExpressionNode
function AssignmentExpressionNode(left, operator, right) {
    return {
        type: 'AssignmentExpression',
        left,
        operator,
        right,
    }
}

function LogicalExpression(left, operator, right) {
    return {
        type: 'LogicalExpression',
        left,
        operator,
        right,
    }
}

function BinaryExpression(left, operator, right) {
    return {
        type: 'BinaryExpression',
        left,
        operator,
        right,
    }
}

//END BinaryExpressionNode

function ConditionalExpression(test, consequent, alternate) {
    return {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate,
    }
}

/**
 * 更新表达式
 *
 * @param {*} operator 操作法 ++ --
 * @param {*} argument 更新的对象参数
 * @param {*} prefix   前缀还是后缀
 * @returns
 */
function UpdateExpression(operator, argument, prefix) {
    return {
        type: 'UpdateExpression',
        operator,
        argument,
        prefix,
    }
}

function UnaryExpression(operator, argument, prefix) {
    return {
        type: 'UnaryExpression',
        operator,
        argument,
        prefix,
    }
}

function NewExpression(callee, args) {
    return {
        type: 'NewExpression',
        callee,
        'arguments': args || []
    }
}

function MemberExpression(computed, object, property) {
    return {
        type: 'MemberExpression',
        computed,
        object,
        property,
    }
}

function CallExpression(callee, args) {
    return {
        type: 'CallExpression',
        callee,
        'arguments': args,
    }
}

function ArrayExpression(elements) {
    return {
        type: 'ArrayExpression',
        elements: elements || [],
    }
}

function ObjectExpression(properties = []) {
    return {
        type: 'ObjectExpression',
        properties,
    }
}

function Property(key, computed, value, kind, method, shorthand) {
    return {
        type: 'Property',
        key,
        computed,
        value,
    }
}

function Literal(value) {
    return {
        type: 'Literal',
        value,
        "raw": "",
        "regex": {
            "pattern": "",
            "flags": ""
        },
    }
}

function ThisExpression() {
    return {
        type: 'ThisExpression',
    }
}

function Identifier(name) {
    return {
        type: 'Identifier',
        name,
    }
}

function FunctionExpression(id, params = [], body) {
    return {
        type: 'FunctionExpression',
        id,
        params,
        body,
        "generator": false,
        "expression": false,
        "async": false,
    }
}


/*---------stats----------*/
function LabeledStatement(label, body) {
    return {
        type: 'LabeledStatement',
        label,
        body,
    }
}

function BlockStatement(body = []) {
    return {
        type: 'BlockStatement',
        body,
    }
}

function EmptyStatement() {
    return {
        type: 'EmptyStatement'
    }
}

function VariableDeclaration(declarations = [], kind = 'var') {
    return {
        type: 'VariableDeclaration',
        declarations,
        kind,
    }
}

function VariableDeclarator(id, init) {
    return {
        type: 'VariableDeclarator',
        id,
        init,
    }
}

function ContinueStatement(label) {
    return {
        type: 'ContinueStatement',
        label,
    }
}

function BreakStatement(label) {
    return {
        type: 'BreakStatement',
        label,
    }
}

function ReturnStatement(argument) {
    return {
        type: 'ReturnStatement',
        argument,
    }
}

function FunctionDeclaration(id, params = [], body = []) {
    return {
        type: 'FunctionDeclaration',
        id,
        params,
        body,
        "generator": false,
        "expression": false,
        "async": false,
    }
}

function IfStatement(test, consequent, alternate) {
    return {
        type: 'IfStatement',
        test,
        consequent,
        alternate,
    }
}

function ForStatement(init, test, update, body) {
    return {
        type: 'ForStatement',
        init,
        test,
        update,
        body,
    }
}

function ForInStatement(left, right, body) {
    return {
        type: 'ForInStatement',
        left,
        right,
        body,
        each: false,
    }
}

function WhileStatement(test, body) {
    return {
        type: 'WhileStatement',
        test,
        body,
    }
}

function DoWhileStatement(test, body) {
    return {
        type: 'DoWhileStatement',
        test,
        body,
    }
}

function SwitchStatement(discriminant, cases) {
    return {
        type: 'SwitchStatement',
        discriminant,
        cases: cases || [],
    }
}

function SwitchCase(test, consequent) {
    return {
        type: 'SwitchCase',
        test,
        consequent: consequent || [],
    }
}

function ExpressionStatement(expression) {
    return {
        type: 'ExpressionStatement',
        expression,
    }
}

function WithStatement(object, body) {
    return {
        type: 'WithStatement',
        object,
        body,
    }
}
function TryStatement(block, handler, finalizer) {
    return {
        type: 'TryStatement',
        block,
        handler,
        finalizer
    }
}

function CatchClause(param, body) {
    return {
        type: 'CatchClause',
        param,
        body,
    }
}

exports = module.exports = {
    SequenceExpressionNode,
    AssignmentExpressionNode,
    ConditionalExpression,
    LogicalExpression,
    BinaryExpression,
    UpdateExpression,
    UnaryExpression,
    NewExpression,
    MemberExpression,
    CallExpression,
    ArrayExpression,
    ObjectExpression,
    Property,
    Literal,
    ThisExpression,
    Identifier,
    FunctionExpression,
    LabeledStatement,
    BlockStatement,
    EmptyStatement,
    VariableDeclaration,
    VariableDeclarator,
    ContinueStatement,
    BreakStatement,
    ReturnStatement,
    FunctionDeclaration,
    IfStatement,
    ForStatement,
    ForInStatement,
    WhileStatement,
    DoWhileStatement,
    SwitchStatement,
    SwitchCase,
    ExpressionStatement,
    WithStatement,
    TryStatement,
    CatchClause,
}








