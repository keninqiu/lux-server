import fetch from 'node-fetch';
import { GoogleService } from '../services/google';

const main = async function () {
    console.log('gogogo');
    const googleServ = new GoogleService();
    const translated = googleServ.translate("High School or Secondary Diplomas & Certificates");
    console.log('translated==', translated);
    //const translated = googleServ.translate("Mr's hello world");
    //const translated = googleServ.translate("Mr's Smith");
    //const translated = googleServ.translate("Hello world");
    //const translated = googleServ.translate("Good morning, my name is dddd");
    //const translated = googleServ.translate("Mr's world");

    //const translated = googleServ.translate('Welding Level "C" Certificates');
    //console.log('translated==', translated);

    /*
    const url = 'http://luxs.luxacademy.cn/api/translate/all/untranslated';
    const response = await fetch(url);

    const body = await response.json();
    const items = body.data;
    console.log('items===', items.length);
    */
}

main();