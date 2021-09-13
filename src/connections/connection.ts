
import * as mongoose from 'mongoose';
import { Secret } from '../config/secret';

function makeNewConnection(uri: string) {
    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return db;
}
//export const pairsummaryConnection = makeNewConnection(Secret.pairsummary);
//export const pairsummarySushiConnection = makeNewConnection(Secret.pairsummarysushi);
//export const uniswapklineConnection = makeNewConnection(Secret.uniswapkline);
//const todoConnection = makeNewConnection('mongodb://127.0.0.1:27017/todo');
