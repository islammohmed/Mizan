import express from 'express'
import { validation } from '../../middleware/validation.js'
import allowedTo from '../../middleware/allowedTo.js'
import { addBudget, adminUpdateBudget, getBudgets, userUpdateBudget } from './controller/budget.js'
import { addBudgetVal, updateBudgetVal } from './budget.validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
const budgetRouter = express.Router()
budgetRouter
    .route('/budget')
    .post(protectedRouter, validation(addBudgetVal), allowedTo('admin'), addBudget)
    .get(protectedRouter, allowedTo('admin'), getBudgets)
budgetRouter.route('/budget/admin/:id')
    .post(protectedRouter, validation(updateBudgetVal), allowedTo('admin'), adminUpdateBudget)
budgetRouter.route('/budget/user/:id')
    .post(protectedRouter, validation(updateBudgetVal), allowedTo('user'), userUpdateBudget)
export default budgetRouter