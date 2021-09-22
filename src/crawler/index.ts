import * as country from './country';
import * as state from './state';
import * as city from './city';
import * as category from './category';
import * as data from './data';
import * as salary from './salary';
import * as single from './single';
import * as slug from './slug';
import * as mongoose from 'mongoose';
import { Secret } from '../config/secret';

const setupDatabase = function() {

    const connString = Secret.db_conn;
    mongoose.connect(connString, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });        
}

const main = async function() {
    setupDatabase();
    //await country.start();
    //await state.start();
    //await city.start();
    //await category.start();
    //await data.start();
    await salary.start();
    //await single.start();
    //await slug.start();
    console.log('done');
}

main();