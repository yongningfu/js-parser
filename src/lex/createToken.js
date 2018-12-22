function createToken(type, character, lineno) {
    character = character || ''
    return {
        'type': type,
        'character': character,
        'lineno': lineno
    }
}

function generatorCreateTokenWithLine(lineno) {
    return function(type, character) {
        return createToken(type, character, lineno)
    }
}

exports = module.exports = {
    createToken: createToken,
    generatorCreateTokenWithLine: generatorCreateTokenWithLine,
}



