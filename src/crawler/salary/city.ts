import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { CityDao } from "../../daos/cityDao";

export const start = async function() {
    const dao = new CityDao();
    const items = await dao.fetchAllWithoutRawData();
    for(let i = 0; i < items.length; i++) {
       try {
        const item = items[i];
        const url = item.url;
        if(!url) {
            console.log('error, url is empty');
        }
        const response = await fetch('https://www.payscale.com' + url);

        const body = await response.text();
        
        const root = parse(body);
    
        const nextDataNode = root.querySelector('#__NEXT_DATA__');
    
        if(!nextDataNode) {
            continue;
        }
        
        const dataText = nextDataNode.text;
        //console.log('dataText=', dataText);
        const data = parseData(dataText);
        //console.log('data=', data);
        const newItem = await dao.update(item._id, data);
        console.log('newItem=', newItem);
      } catch(e: any) {
         i --;
      }
    }
}

const parseData = function(dataText: string) {
    const json = JSON.parse(dataText);

    return {
       rawData: json
    }
}