import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CountryDao } from "../../daos/countryDao";
import { CategoryDao } from "../../daos/categoryDao";

const type = 'Certification';
export const start = async function() {
    const countryDao = new CountryDao();
    const dao = new CategoryDao();
    await dao.deleteAllByType(type);
    const countries = await countryDao.fetchAll();
    for(let i = 0; i < countries.length; i++) {
        const country = countries[i];
        const code = country.code;
        const countryId = country._id;

        const response = await fetch('https://www.payscale.com/research/' + code + '/' + type);
        const body = await response.text();
        
        const root = parse(body);
    
        const rows = root.querySelector('.entitycards__container');
    
        if(!rows) {
            continue;
        }
        
        const childNodes = rows.childNodes;
        for(let j = 0; j < childNodes.length; j++) {
            const node = childNodes[j] as HTMLElement;
            const href = node.getAttribute('href');
            if(!href) {
                console.log('href is empty');
                continue;
            }
            const name = node.text;

            const body = {
                name: name,
                type: type,
                url: href,
                country: countryId
            };
    
            console.log('body=', body);
            await dao.create(body);
        }


    }
    

    
}