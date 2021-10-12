import fetch from 'node-fetch';
import { GoogleService } from '../../services/google';

export const start = async function() {
    const googleServ = new GoogleService();
    console.log('gogogo');
    
    //const translated = googleServ.translate("Mr's hello world");
    //const translated = googleServ.translate("Mr's Smith");
    //const translated = googleServ.translate("Hello world");
    //const translated = googleServ.translate("Good morning, my name is dddd");
    //const translated = googleServ.translate("Mr's world");

    //const translated = googleServ.translate('Welding Level "C" Certificates');
    //console.log('translated==', translated);

    const url = 'http://luxs.luxacademy.cn/api/translate/all/untranslated/Category';
    const response = await fetch(url);
    const body = await response.json();

    
    const items = body.data;
    console.log('items.length=', items.length);
    for(let i = 0; i < items.length; i++) {
        console.log('i===', i);
        const item = items[i];
        const en = item.en;
        const desc = item.desc;
        const zh = googleServ.translate(en);
        let desczh = '';
        if(desc) {
            desczh = googleServ.translate(desc);
            console.log('desc==', desczh);
        }

        const newData = {
            zh,
            desczh
        }
        //console.log('newData==', newData);
        const updatedUrl = "http://luxs.luxacademy.cn/api/translate/" + item._id;

        const response = await fetch(updatedUrl, {
            method: 'put',
            body: JSON.stringify(newData),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log('data===', data);

    }
}