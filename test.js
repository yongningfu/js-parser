const JSParser = require('./src')

const fs = require('fs');
fs.readFile('./testCode.txt', 'utf8', function(err, data){

    const tokens = JSParser.tokenize(data)
    console.log('tokens: ', JSON.stringify(tokens))
    console.log('-------')
    const statNodes = JSParser.parser(data)
    console.log('stats: ', JSON.stringify(statNodes))
});

