import * as job from './job';
import * as school from './school';
import * as employer from './employer';
import * as degree from './degree';
import * as industry from './industry';
import * as certification from './certification';
import * as skill from './skill';

export const start = async function() {
    //await school.start();
    //await job.start();
    
    await employer.start();
    
    await degree.start();
    await industry.start();
    await certification.start();
    await skill.start();
    
}
