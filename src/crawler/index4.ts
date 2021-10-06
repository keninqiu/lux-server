import * as mongoose from 'mongoose';
import { Secret } from '../config/secret';
import * as distinct from './distinct';
import * as desc from './desc';
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
    await desc.start();
    console.log('done');
}

main();