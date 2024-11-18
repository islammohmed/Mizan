
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { budgetModel } from '../../../../db/models/Budget.model.js'
import { userModel } from '../../../../db/models/user.model.js'


const addBudget = catchError(async (req, res, next) => {
    let budget = new budgetModel(req.body)
    await budget.save()
    !budget && next(new AppError('invalid data', 404))
    budget && res.send({ msg: 'success', budget })
})
const getBudgets = catchError(async (req, res, next) => {
    let Budgets = await budgetModel.find()
    res.send({ msg: "success", Budgets })
})
const adminUpdateBudget = catchError(async (req, res, next) => {
    let { allocation } = req.body
    let updateBudget = await budgetModel.findByIdAndUpdate(req.params.id, { allocation: allocation }, { new: true })
    res.send({ msg: "success", updateBudget })
})
const userUpdateBudget = catchError(async (req, res, next) => {
    let { expenses } = req.body
    let updateBudget = await budgetModel.findByIdAndUpdate(req.params.id, { expenses: expenses }, { new: true })
    res.send({ msg: "success", updateBudget })
})
const deleteBudget = catchError(async (req, res, next) => {
    await budgetModel.findByIdAndDelete(req.params.id);
    res.send({ msg: "success" })
})

const getBudetsForUser = catchError(async (req, res, next) => {
    const user = await userModel.findById(req.user._id).populate({
        path: 'budgets.budgetId',
        model: 'Budget'
    })

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const budgetsWithPermissions = user.budgets.map(budget => ({
        budgetId: budget.budgetId._id,
        title: budget.budgetId.title,
        amount: budget.budgetId.amount,
        description: budget.budgetId.description,
        permission: budget.permission
    }));
    res.json({ budgets: budgetsWithPermissions });
})
export {
    addBudget,
    getBudgets,
    adminUpdateBudget,
    userUpdateBudget,
    deleteBudget,
    getBudetsForUser
}