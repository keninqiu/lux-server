// https://www.payscale.com/research/CA/School/For-Sports-Fans


import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CountryDao } from "../../daos/countryDao";
import { CategoryDao } from "../../daos/categoryDao";
import { SchoolDao } from "../../daos/schoolDao";

const type = 'School';
export const start = async function() {
    const countryDao = new CountryDao();
    const categoryDao = new CategoryDao();
    const dao = new SchoolDao();
    await dao.deleteAll();
    const categories = await categoryDao.fetchAllByTypePopulate(type);
    for(let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const categoryId = category._id;
        const url = category.url;
        const categoryType = category.type;
        if(categoryType != type) {
            console.log('categoryType != type, stop');
            return;
        }
        if(!url) {
            console.log('url is empty for category:' + categoryId);
            return;
        }
        const response = await fetch('https://www.payscale.com' + url);
       const body = await response.text();
        
        const root = parse(body);
    
        const rows = root.querySelector('.subcats__links');
    
        if(!rows) {
            continue;
        }
        
        const childNodes = rows.childNodes;
        for(let j = 0; j < childNodes.length; j++) {
            const node = childNodes[j] as HTMLElement;
            const href = node.getAttribute('href');
            if(!href) {
                continue;
            }
            const name = node.text;

            const body = {
                name: name,
                url: href,
                category: categoryId
            };
            console.log('body=', body);
            await dao.create(body);
        }


    }
    

    
}
