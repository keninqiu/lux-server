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
        ],
        change: {
            title: '变化正在发生',
            subtitle: '做好准备',
            content: 'Lux 为员工和雇主提供新鲜、透明和经过验证的工资数据、易于使用的软件和服务，以在任何市场条件下获得正确的报酬。'
        },
        salary: {
            title: '使用透明的薪资数据做出清晰、自信的决策',
            subtitle: '我们致力于通过提供对各个来源保持真实和透明的可靠薪酬市场数据来确保薪酬准确性。',
            actionText: '查看更多信息',
            actionLink: '/',
            details: [
                {
                    title: '>300',
                    subtitle: '传统调查合作伙伴',
                    content: '轻松将您自己的调查加载到 Lux 解决方案中，并访问来自数百个第三方发布商的 10,000 多个相关薪酬调查。'
                },
                {
                    title: '5.5K',
                    subtitle: '雇主提供的定价工作',
                    content: '访问每季度更新的 HRIS 调查数据，这些数据来自 2,000 多个参与 Lux 的客户，这些客户代表了 40 个行业的超过 200 万名员工，而且还在不断增加。'
                },
                {
                    title: '350K',
                    subtitle: '每月新的在线工资资料',
                    content: '通过来自每月超过 800 万访问者的每日来源、持续验证的在线调查资料，您可以在任何地方获得最新的薪酬数据。'
                }                                
            ]            
        },
        experience: {
            title: '我们有非常好的用户体验',
            subtitle: '从小型企业到财富 1000 强全球企业的 7,500 多家客户与 Lux 合作，以提升他们的薪酬策略，吸引和留住最优秀的人才，并释放薪酬的真正力量。',
            actionText: '查看更多信息',
            actionLink: '/',           
        },
        best: {
            title: 'Lux 是同类中最好的',
            subtitle: 'Lux 薪酬数据、服务和软件因其领先地位、易用性和快速实施而屡获殊荣，这归功于我们透明的流程和我们对数据完整性的承诺。',
            actionText: '查看更多信息',
            actionLink: '/',               
        }
    };
    await dao.create(data);
}







