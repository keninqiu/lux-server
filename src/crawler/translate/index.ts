import * as country from './country';
import * as state from './state';
import * as city from './city';
import * as category from './category';
import * as skill from './skill';
import * as degree from './degree';
import * as employer from './employer';
import * as school from './school';
import * as job from './job';
import * as industry from './industry';
import * as certification from './certification';

export const start = async function() {
    //await country.start();
    //await state.start();
    //await city.start();
    
    //await category.start();
    
    //await skill.start();
    
    //await school.start();
    
    await job.start();
    /*
    await industry.start();
    await employer.start();
    await degree.start();
    await certification.start();
    */
}