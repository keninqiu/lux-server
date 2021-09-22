////research/US/Certification=Certified_Euthanasia_technician/Hourly_Rate

import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CertificationDao } from "../../daos/certificationDao";

export const start = async function() {
    const dao = new CertificationDao();
    const url = '/research/US/Certification=Certified_Euthanasia_technician/Hourly_Rate';
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
