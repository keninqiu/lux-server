//////research/US/Industry=Sheep_Farming/Hourly_Rate
//http://localhost:4200/research/US/Industry%3DSheep_Farming/Hourly_Rate
import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { IndustryDao } from "../../daos/industryDao";

export const start = async function() {
    const dao = new IndustryDao();
    const url = '/research/AF/Industry=Intelligence%2C_Surveillance%2C_and_Reconnaissance_Services/Salary';
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
