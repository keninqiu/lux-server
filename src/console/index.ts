
import { GoogleService } from '../services/google';

const main = function () {
    const googleServ = new GoogleService();
    //const translated = googleServ.translate("Mr's hello world");
    //const translated = googleServ.translate("Mr's Smith");
    //const translated = googleServ.translate("Hello world");
    //const translated = googleServ.translate("Good morning, my name is dddd");
    //const translated = googleServ.translate("Mr's world");

    const translated = googleServ.translate('Mrs said: "world"');
    console.log('translated==', translated);

}
main();