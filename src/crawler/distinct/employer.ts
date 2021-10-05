import { EmployerDao } from "../../daos/employerDao";
import { TranslateDao } from "../../daos/translateDao";

const type = 'Employer';
export const start = async function() {
    const dao = new EmployerDao();
    const translateDao = new TranslateDao();
    await translateDao.deleteAllByType(type);
    const items = await dao.fetchDistinct();
    const translates = items.map(item => {
        return {
            en: item,
            type
        };
    });
    const inserted = await translateDao.insertMany(translates);
    
    const translateItems = await translateDao.fetchAllByType(type);

    console.log('translateItems==', translateItems);

    for(let i = 0; i < translateItems.length; i++) {
        const item = translateItems[i];
        const id = item._id;
        const name = item.en;
        const entities = await dao.fetchAllByName(name);
        //console.log('entities.length=', entities.length);
        const ids = entities.map(entity => entity._id);
        const updated = await dao.updateManyByQuery({_id: {$in: ids}}, {namet: id});
        console.log('updated===', updated);
    }
}
