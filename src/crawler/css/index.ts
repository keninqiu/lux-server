const fs = require('fs');

const cssDir = '/Library/WebServer/Documents/lux/client/src/assets/css/home';

const selectors = [
    '.two-columns-branded'
];
const parseCss = function(data: any) {
    let allCss = '';
    for(let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        while(true) {
            const index = data.indexOf(selector);
            if(index >= 0) {
                const substring = data.substring(index);
                const index1 = substring.indexOf('{');
                const index2 = substring.indexOf('}');
                const css = substring.substring(index1, index2 + 1);
                allCss += selector + css + '\n';
                data = substring.substring(index2 + 1);
            } else {
                break;
            }
        }

    }

    if(allCss) {
        console.log('allCss==', allCss);
    }
    

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

