import { DegreeDao } from "../../daos/degreeDao";

export const start = async function() {
    const dao = new DegreeDao();
    const items = await dao.fetchAll();
    for(let i = 0; i < items.length; i++) {
        console.log('i==', i);
        const item = items[i];
        const id = item._id;
        const url = item.url;
        const category = item.category;
        const categories = [category];
        for(let j = i+1; j < items.length; j++) {
            const item2 = items[j];
            const id2 = item2._id;
            const url2 = item2.url;
            const category2 = item2.category;
            if(url == url2) {
                categories.push(category2);
                await dao.update(id2, {duplicatedWith: id});
                items.splice(j, 1); 
                j --;
            }
        }

        await dao.update(id, {categories});
    }
}