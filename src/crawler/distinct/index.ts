import * as job from './job';
import * as country from './country';
import * as state from './country';
import * as city from './city';

export const start = async function() {
    //await job.start();
    //await country.start();
    await state.start();
    await city.start();
}