import * as mongoose from 'mongoose';
import { Secret } from '../config/secret';
import { TranslateDao } from "../daos/translateDao";
import { GoogleService } from "../services/google";

const setupDatabase = function() {

    const connString = Secret.db_conn;
    mongoose.connect(connString, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });        
}

const start = async function() {
    const dao = new TranslateDao();
    const googleServ = new GoogleService();
    const translates = await dao.fetchAll();
    console.log('translates.length=' + translates.length);
    for(let i = 0; i < translates.length; i++) {
        const translate = translates[i];
        console.log('translate==', translate);
        const en = translate.en.replace(new RegExp('_.', 'g'), '');
        let zh = translate.zh.replace(new RegExp('_.', 'g'), '').replace(new RegExp('。', 'g'), '');
        //console.log('en=====', en);
        //console.log('zh=====', zh);
        if(en == zh) {
            console.log('en==', en);
            console.log('need retrasnate for ',zh);
            zh = await googleServ.translate3(translate.en);
            console.log('new translate=', zh);
            if(zh != translate.zh) {
                console.log('zh==', zh);
                console.log('translate.zh==', translate.zh);
                await dao.update(translate._id, {zh});
            } else {
                zh = await googleServ.translate2(translate.en);
                console.log('new translate222=', zh);
                if(zh != translate.zh) {
                    await dao.update(translate._id, {zh});
                } 
            }

            
        }

    }
}

const main = async function() {
    setupDatabase();
    await start();
    console.log('done');
}

main();