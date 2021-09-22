import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { PopularDao } from "../../daos/popularDao";
import { CountryDao } from "../../daos/countryDao";

export const start = async function() {
    const dao = new PopularDao();
    const countryDao = new CountryDao();
    const countries = await countryDao.fetchAll();

    const types = [
        'Job',
        'Certification',
        'Degree',
        'Employer',
        'Industry',
        'School',
        'Skill'
    ];

    for(let i = 0; i < types.length; i++) {
        const type = types[i];
        for(let j = 0; j < countries.length; j++) {
            const country = countries[j];
            const url = '/research/' + country.code + '/' + type;
            if(!url) {
                console.log('error, url is empty');
            }
            try {
                const response = await fetch('https://www.payscale.com' + url);
        
                const body = await response.text();
                
                const root = parse(body);
            
                const nextDataNode = root.querySelector('#__NEXT_DATA__');
            
                const dataText = nextDataNode.text;
                const data = parseData(dataText);
                const item = {
                    url: url,
                    rawData: data.rawData,
                    country: country._id,
                    type: type
                }
                const newItem = await dao.create(item);
                console.log('newItem==', newItem);                
            } catch(e: any) {
                j --;
            }

        }
    }


}

const parseData = function(dataText: string) {
    const json = JSON.parse(dataText);

    return {
       rawData: json
    }
}
