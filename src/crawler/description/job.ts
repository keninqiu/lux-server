import fetch from 'node-fetch';
import { GoogleService } from "../../services/google";

const baseUrl = 'http://localhost:3004/api/job/';
export const start = async function() {
    const googleServ = new GoogleService();
    const url = baseUrl + 'all/withoutDescription';
    const response = await fetch(url);

    const body = await response.json();
    console.log('body.data=', body.data);
    const items = body.data;
    for(let i = 0; i < items.length; i++) {
        const item = items[i];
        const rawData = item.rawData;
        const pageData = rawData.props.pageProps.pageData;
        const narratives = pageData.narratives;
        if(narratives && narratives.description) {
            const zh = await googleServ.translate(narratives.description);
            console.log('zh==', zh);
        }
    }
}