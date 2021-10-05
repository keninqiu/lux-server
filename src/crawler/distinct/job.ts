import { JobDao } from "../../daos/jobDao";
import { TranslateDao } from "../../daos/translateDao";

const type = 'Job';
export const start = async function() {
    const dao = new JobDao();
    const translateDao = new TranslateDao();
    const items = await dao.fetchDistinct();
    const translates = items.map(item => {
        return {
            en: item,
            type
        };
    });
    const inserted = await translateDao.insertMany(translates);
    console.log('inserted==', inserted);
}
