import * as job from './job';
import * as country from './country';
import * as state from './country';
import * as city from './city';
import * as category from './category';
import * as certification from './certification';
import * as degree from './degree';
import * as employer from './employer';
import * as industry from './industry';
import * as school from './school';
import * as skill from './skill';

export const start = async function() {
    //await job.start();
    //await country.start();
    //await state.start();
    //await city.start();
    await category.start();
    /*
    await certification.start();
    await degree.start();
    await employer.start();
    await industry.start();
    await school.start();
    await skill.start();
    */
}