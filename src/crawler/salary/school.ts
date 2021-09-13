import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CountryDao } from "../../daos/countryDao";
import { CategoryDao } from "../../daos/categoryDao";
import { SchoolDao } from "../../daos/schoolDao";

const type = 'School';
export const start = async function() {
    const countryDao = new CountryDao();
    const categoryDao = new CategoryDao();
    const schoolDao = new SchoolDao();
    const dao = new SchoolDao();
    const shcools = await schoolDao.fetchAllAndPopulate();
    for(let i = 0; i < shcools.length; i++) {
        const school = shcools[i];
        const schoolName = school.name;
        const countryName = school.category.country;
        const url = school.url;
        if(!url) {
            console.log('error, url is empty');
        }
        const response = await fetch('https://www.payscale.com' + url);

        const body = await response.text();
        console.log('body=', body);
        
        const root = parse(body);
    
        const nextDataNode = root.querySelector('#__NEXT_DATA__');
    
        if(!nextDataNode) {
            continue;
        }
        
        const dataText = nextDataNode.text;
        const data = parseData(dataText);
        console.log('data=', data);
        const newSchool = await dao.update(school._id, data);
        console.log('newSchool=', newSchool);
    }
}

const parseData = function(dataText: string) {
    const json = JSON.parse(dataText);
    const compensation = json.props.pageProps.pageData.compensation;
    return {
        compensation
    };
}
