//import * as job from './job';
import * as school from './school';
import * as job from './job';
import * as category from './category';
import * as industry from './industry';
import * as certification from './certification';
import * as skill from './skill';
import * as degree from './degree';
import * as employer from './employer';
export const start = async function() {
    /*
    await country.start();
    await state.start();
    await city.start();
    */
    await school.start();
    await job.start();
    await industry.start();
    await certification.start();
    await skill.start();
    await degree.start();
    await employer.start();
    
}