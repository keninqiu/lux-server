///research/US/Degree=Bachelor_of_Science_(BS_%2F_BSc)%2C_German_Studies/Salary

import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { DegreeDao } from "../../daos/degreeDao";

export const start = async function() {
    const dao = new DegreeDao();
    const url = '/research/AL/Degree=Bachelor_of_Architecture_(BArch)%2C_Architecture/Salary';
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
}

const parseData = function(dataText: string) {
    const json = JSON.parse(dataText);

    return {
       rawData: json
    }
}
