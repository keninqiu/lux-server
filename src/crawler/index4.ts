import * as mongoose from 'mongoose';
import { Secret } from '../config/secret';
import * as distinct from './distinct';
import * as desc from './desc';
import * as translate from './translate';
const setupDatabase = function() {

    const connString = Secret.db_conn;
    mongoose.connect(connString, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });        
}

const main = async function() {
    setupDatabase();
    //await distinct.start();
    //await desc.start();
    await translate.start();
    console.log('done');
}

main();