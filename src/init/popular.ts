import { PopularDao } from "../daos/popularDao";
import { CategoryDao } from "../daos/categoryDao";


export const start = async function() {
    const dao = new PopularDao();
    const categoryDao = new CategoryDao();
    /*
    for(let i = 0; i < types.length; i++) {
        const type = types[i];
        await dao.fetchByCountryCodeAndType
    }
    */
   const populars = await dao.fetchAll();
   for(let i = 0; i < populars.length; i++) {
       console.log('i==', i);
       const popular = populars[i];
       const pageData = popular.rawData.props.pageProps.pageData;
       if(pageData) {
        const items = pageData.items;
        const secondaryItems = pageData.secondaryItems;
        
        //console.log('secondaryItems===', secondaryItems);
        const urls = [];
        for(let j = 0; j < items.length; j++) {
            const item = items[j];
            const url = item.url;
            urls.push(url);
        }
        console.log('urls=', urls);
        const updated = await categoryDao.updateByQuery({ url : { $in : urls } }, {popular: 2});

        //console.log('updated=', updated);
        const secondaryUrls = [];
        for(let j = 0; j < secondaryItems.length; j++) {
         const item = secondaryItems[j];
         const url = item.url.replace('/Salary', '').replace('/Hourly_Rate', '');
         secondaryUrls.push(url);
         //console.log('url==', url);
        }

        console.log('secondaryUrls=', secondaryUrls);
        const updated2 = await categoryDao.updateByQuery({ url : { $in : secondaryUrls } }, {popular: 1});
        console.log('updated2==', updated2);
       }


   }
}