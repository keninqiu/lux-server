import * as mongoose from 'mongoose';
import { Secret } from '../config/secret';
import * as homepage from './homepage';
import * as popular from './popular';

const setupDatabase = function() {

    const connString = Secret.db_conn;
    mongoose.connect(connString, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });        
}

const main = async function() {
    setupDatabase();
    //await homepage.start();
    await popular.start();
    console.log('done');
}

main();