
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { budgetModel } from '../../../../db/models/Budget.model.js'


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
export {
    addBudget,
    getBudgets,
    adminUpdateBudget,
    userUpdateBudget
}