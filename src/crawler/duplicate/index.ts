
import * as skill from './skill';

import * as degree from './degree';
import * as employer from './employer';
import * as school from './school';
import * as job from './job';
import * as industry from './industry';
import * as certification from './certification';

export const start = async function() {
    //await skill.start();
    
    //await school.start();
    
    //await job.start();
    
    //await industry.start();
    
    //await employer.start();
    
    //await degree.start();
    
    await certification.start();
}