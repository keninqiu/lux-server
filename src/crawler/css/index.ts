var csstree = require('css-tree');

// parse CSS to AST
var ast = csstree.parse('.example { world: "!" }');

// traverse AST and modify it
csstree.walk(ast, function(node: any) {
    if (node.type === 'ClassSelector' && node.name === 'example') {
        node.name = 'hello';
    }
});

// generate CSS from AST
console.log(csstree.generate(ast));