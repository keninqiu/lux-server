import * as school from './school';
import * as industry from './industry';
import * as job from './job';
import * as certification from './certification';
import * as skill from './skill';
import * as degree from './degree';
import * as employer from './employer';

export const start = async function() {
    //await school.start();
    //await industry.start();
    //await job.start();
    //await certification.start();
    await skill.start();
    await degree.start();
    await employer.start();
}
