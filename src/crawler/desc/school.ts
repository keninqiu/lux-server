import { TranslateDao } from "../../daos/translateDao";
import { SchoolDao } from "../../daos/schoolDao";

const type = 'School';
export const start = async function() {
    const translateDao = new TranslateDao();
    const dao = new SchoolDao();
    const translates = await translateDao.fetchAllByType(type);
    for(let i = 0; i < translates.length; i++) {
        const translate = translates[i];
        const name = translate.en;
        const item = await dao.fetchOneByName(name);
        if(item) {
            const rawData = item.rawData;
            console.log('rawData.props.pageProps===', rawData.props.pageProps);
            const pageData = rawData.props.pageProps.pageData;
            console.log('pageData===', pageData);
            const about = pageData.about;
            
            if(about && about.abstract) {

                const updated = await translateDao.update(translate._id, {desc: about.abstract});
                console.log('updated==', updated);
            }
        }

    }
}