import { HomepageDao } from "../daos/homepageDao";

export const start = async function() {
    const dao = new HomepageDao();
    const data = {
        adv: {
            text: '了解 Lux 如何使高效地管理薪酬',
            url: '/'
        },
        carousels: [
            {
                title: '薪酬分析是一个强大的工具',
                subtitle: '通过相关的、经过验证的薪酬数据和行业领先的人工智能驱动的薪酬软件，获得洞察力和信心，从而获得合理的薪酬。',
                actionText: '给工作定价',
                actionLink: '/'
            },
            {
                title: '遵循 2021 年薪酬的最佳实践',
                subtitle: '带着刚刚发布的关于加薪、薪酬管理、沟通和透明度的最佳战略和实践的见解，迎接 2021 年。',
                actionText: '查看报告',
                actionLink: '/'
            }
        ]
    };
    await dao.create(data);
}
