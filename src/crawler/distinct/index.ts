import * as job from './job';
import * as country from './country';
export const start = async function() {
    //await job.start();
    await country.start();
}