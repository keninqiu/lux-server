// https://www.payscale.com/research/US/State=California/City

import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CountryDao } from "../daos/countryDao";
import { StateDao } from "../daos/stateDao";
import { CityDao } from "../daos/cityDao";

export const start = async function() {
    const countryDao = new CountryDao();
    const stateDao = new StateDao();
    const dao = new CityDao();

    const states = await stateDao.fetchAllPopulate();
    for(let i = 0; i < states.length; i++) {
        try {
        const state = states[i];
        const stateId = state._id;
        let url = state.url;
        url = 'https://www.payscale.com' + url;
        console.log('url=', url);
        let response = await fetch(url);
        let body = await response.text();
        
        let root = parse(body);
    
        const additionalCities = root.querySelector('.locationv2__additional--cities');
    
        if(additionalCities) {
            console.log('has addiction cities');
            const additionalCityNode = additionalCities.childNodes[0] as HTMLElement;

            url = 'https://www.payscale.com' + additionalCityNode.getAttribute('href');
    
    
            response = await fetch(url);
            body = await response.text();
            root = parse(body);
        } else {
            console.log('no additional cities');
        }
        


        let rootNode = root.querySelector('.maincontent .location__row');
        if(!rootNode) {
            rootNode = root.querySelector('.page-section .locationv2__row');
        }
        if(!rootNode) {
            continue;
        }
        const childNodes = rootNode.childNodes;
        //console.log('\n');
        //console.log(childNodes);
        for(let j = 0; j < childNodes.length; j++) {
            const node = childNodes[j];

            
            const aNode = node.childNodes[0] as HTMLElement;
            const href = aNode.rawAttributes['href'];
            
            const name = node.text;
            
            const body = {
                name: name,
                code: '',
                url: href,
                state: stateId
            };
    
            console.log('body=', body);
            await dao.create(body);
        }
        } catch(e: any) {
            i --;
        } 

    }
    

    
}
