import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CountryDao } from "../daos/countryDao";
import { StateDao } from "../daos/stateDao";

export const start = async function() {
    const countryDao = new CountryDao();
    const dao = new StateDao();

    const countries = await countryDao.fetchAll();
    for(let i = 0; i < countries.length; i++) {
        console.log('i=', i);
        const country = countries[i];
        const code = country.code;
        const url = country.url;
        const countryId = country._id;

        const response = await fetch('https://www.payscale.com' + url);
        const body = await response.text();
        
        const root = parse(body);
    
        const rows = root.querySelector('#state-section .location--top-spaced');
    
        if(!rows) {
            continue;
        }
        
        const childNodes = rows.childNodes;
        //console.log('\n');
        //console.log(childNodes);
        for(let j = 0; j < childNodes.length; j++) {
            const node = childNodes[j];
            const name = node.text;
            
            const aNode = node.childNodes[0] as HTMLElement;
            const href = aNode.rawAttributes['href'];
            const locationString = '/research/AF/';
            console.log('href=', href);
            let location = href.substring(locationString.length);
            let type = '';
            if(location.indexOf('Location=') == 0) {
                type = 'Location';
                location = location.substring('Location='.length);
            } else
            if(location.indexOf('State=') == 0) {
                type = 'State';
                location = location.substring('State='.length);
            }
            location = location.substring(0, location.indexOf('/'));
            const body = {
                name: name,
                type: type,
                url: href,
                location: location,
                code: '',
                country: countryId
            };
    
            console.log('body=', body);
            await dao.create(body);
        }


    }
    

    
}
