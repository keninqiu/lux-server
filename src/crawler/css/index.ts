var csstree = require('css-tree');
const fs = require('fs');

const cssDir = '/Library/WebServer/Documents/lux/client/src/assets/css/home';


const parseCss = function(data: any) {
    var ast = csstree.parse(data);

    // traverse AST and modify it
    csstree.walk(ast, function(node: any) {
        if (node.type === 'ClassSelector' && node.name === 'banner') {
            //node.name = 'hello';
            //console.log('node==', node);
            //console.log(csstree.generate(node));
            console.log('node.content=', node.combinator);
        }
    });

    //console.log(csstree.generate(ast));
};

fs.readdir(cssDir, (err: any, files: any) => {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach((file: any) => {
        console.log(file);
        const fileName = cssDir + '/' + file;
        fs.readFile(fileName, {encoding: 'utf-8'}, (err: any, data: any) => {
            if (err) {
                console.log(err);
                return;
            }
            parseCss(data);   
        });
    });
  })

  /*
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
*/