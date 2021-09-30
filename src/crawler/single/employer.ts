//http://localhost:4200/research/US/Employer%3DICF_International/Salary
import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { EmployerDao } from "../../daos/employerDao";

export const start = async function() {
    const dao = new EmployerDao();
    const url = '/research/AT/Employer=Novartis/Salary';
    if(!url) {
        console.log('error, url is empty');
    }
    const response = await fetch('https://www.payscale.com' + url);

    const body = await response.text();
    
    const root = parse(body);

    const nextDataNode = root.querySelector('#__NEXT_DATA__');

    const dataText = nextDataNode.text;
    const data = parseData(dataText);
    const newItem = await dao.updateByQuery({url: url}, data);
    console.log('newItem=', newItem);
}

const parseData = function(dataText: string) {
    const json = JSON.parse(dataText);

    return {
       rawData: json
    }
}
