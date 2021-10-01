import { EmployerDao } from "../../daos/employerDao";
import { TranslateDao } from "../../daos/translateDao";
import { GoogleService } from "../../services/google";
const type = 'Employer';

export const start = async function() {
    const googleServ = new GoogleService();
    const dao = new EmployerDao();
    const translateDao = new TranslateDao();
    const items = await dao.fetchAllWithoutDuplicate();
    for(let i = 0; i < items.length; i++) {
        console.log('i==', i);
        const item = items[i];
        const id = item._id;
        const name = item.name;
        let translate = await translateDao.fetchByEn(name);
        if(!translate) {
        
            const zh = await googleServ.translate(name);
            if(!zh) {
                console.log('cannot get translation for ' + name);
                return;
            }

            const data ={
                en: name,
                zh,
                type
            }
            translate = await translateDao.create(data);
        }
        if(translate && translate._id) {
            await dao.update(id, {namet: translate._id});
        }
    }
}