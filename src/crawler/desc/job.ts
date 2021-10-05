import { TranslateDao } from "../../daos/translateDao";
import { JobDao } from "../../daos/jobDao";

const type = 'Job';
export const start = async function() {
    const translateDao = new TranslateDao();
    const dao = new JobDao();
    const translates = await translateDao.fetchAllByType(type);
    for(let i = 0; i < translates.length; i++) {
        const translate = translates[i];
        const name = translate.en;
        const item = await dao.fetchOneByName(name);
        if(item) {
            const rawData = item.rawData;
            const pageData = rawData.props.pageProps.pageData;
            const narratives = pageData.narratives;
            if(narratives && narratives.description) {

                const updated = await translateDao.update(translate._id, {desc: narratives.description});
                console.log('updated==', updated);
            }
        }

    }
}