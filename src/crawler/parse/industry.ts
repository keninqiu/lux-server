import fetch from 'node-fetch';
export const start = async function() {
    while(true) {

        const url = 'http://luxs.luxacademy.cn/api/industry/notparsed';
        console.log('url==', url);
        const response = await fetch(url);
        
        const body = await response.json();
    
        const items = body.data;
        console.log('items=', items);
        if(!items || (items.length == 0)) {
            break;
        }
    }

}