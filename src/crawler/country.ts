import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CountryDao } from "../daos/countryDao";

export const start = async function() {
    const dao = new CountryDao();
    const response = await fetch('https://www.payscale.com/research/Country');
    const body = await response.text();
    
    //console.log(body);
    const root = parse(body);

    const rows = root.querySelector('.location--top-spaced');

    const childNodes = rows.childNodes;
    //console.log('\n');
    //console.log(childNodes);
    childNodes.forEach( node => {
        const aNode = node.childNodes[0] as HTMLElement;
        const href = aNode.rawAttributes['href'];
        //console.log('node.text=', node.text);
        const length = '/research/'.length;
        const code = href.substring(length, length + 2);
        const name = node.text;
        
        const body = {
            name: name,
            url: href,
            code: code,
            currencyCode: ''
        };
        dao.create(body);
    });
}
