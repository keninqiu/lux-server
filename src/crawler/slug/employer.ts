import { EmployerDao } from "../../daos/employerDao";

const type = 'Employer';

export const start = async function() {
    const dao = new EmployerDao();
    const items = await dao.fetchAll();
    console.log('got for ' + type);
    for(let i = 0; i < items.length; i++) {
        const item = items[i];
        const url = item.url;
        console.log('item==', item);
        if(!url) {
            continue;
        }
        if(item.slug) {
            continue;
        }
        const index = url.lastIndexOf('=');
        const index2 = url.lastIndexOf('/');
        const slug = url.substring(index + 1, index2);
        const salaryType = url.substring(index2 + 1);
        const newItem = await dao.update(item._id, {slug, salaryType});
        console.log('url==', url);
        console.log('slug=', slug);
        console.log('newItem=', newItem);
        console.log('salaryType=', salaryType);
    }
}