import { HomepageDao } from "../daos/homepageDao";

export const start = async function() {
    const dao = new HomepageDao();
    const data = {
        adv: {
            text: '了解 Lux 如何使高效地管理薪酬',
            url: '/'
        }
    };
    await dao.create(data);
}
