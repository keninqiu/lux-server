import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { SchoolDao } from "../../daos/schoolDao";
//http://localhost:4200/research/US/School%3DCollins_College_-_Phoenix,_AZ/Salary
export const start = async function() {
    const dao = new SchoolDao();
    const url = '/research/US/School=Collins_College_-_Phoenix%2C_AZ/Salary';
    if(!url) {
        console.log('error, url is empty');
    }
    const response = await fetch('https://www.payscale.com' + url);

    const body = await response.text();
    
    const root = parse(body);

    const nextDataNode = root.querySelector('#__NEXT_DATA__');

    const dataText = nextDataNode.text;
    console.log('dataText=', dataText);
    const data = parseData(dataText);
    const newItem = await dao.updateByQuery({url: url}, data);
}

const parseData = function(dataText: string) {
    const json = JSON.parse(dataText);

    return {
       rawData: json
    }
}