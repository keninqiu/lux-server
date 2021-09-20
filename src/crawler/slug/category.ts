import { CategoryDao } from "../../daos/categoryDao";

export const start = async function() {
    const dao = new CategoryDao();
    const items = await dao.fetchAll();
    for(let i = 0; i < items.length; i++) {
        const item = items[i];
        const url = item.url;
        const index = url.lastIndexOf('/');
        const slug = url.substring(index + 1);
        await dao.update(item._id, {slug});
        console.log('url==', url);
        console.log('slug=', slug);
    }
}