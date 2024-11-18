import cron from 'node-cron';
import { budgetModel } from '../../../../db/models/Budget.model.js';

cron.schedule('0 0 1 * *', async () => {
    console.log('Running monthly report...');
    await generateMonthlyReport();
});

export const generateMonthlyReport = async () => {
    try {
        const budgets = await budgetModel.find({}, 'name expenses allocation');
        const report = budgets.map(budget => ({
            name: budget.name,
            description: budget.desc,
            allocation: budget.allocation,
            expenses: budget.expenses,
            remaining: budget.allocation - budget.expenses,
        }));

        return report;

    } catch (error) {
        console.error('Error generating report:', error);
    }
};
const getMonthlyReport = async (req, res) => {
    try {
        const report = await generateMonthlyReport();
        res.status(200).json({ msg: 'Monthly Report', report });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to generate report', error });
    }
};

export {
    getMonthlyReport
}
