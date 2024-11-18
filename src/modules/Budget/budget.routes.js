import express from 'express'
import { validation } from '../../middleware/validation.js'
import allowedTo from '../../middleware/allowedTo.js'
import { addBudget, adminUpdateBudget, deleteBudget, getBudetsForUser, getBudgets, userUpdateBudget } from './controller/budget.js'
import { addBudgetVal, updateBudgetVal } from './budget.validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import { paramsIdVal } from '../user/user.validation.js'
const budgetRouter = express.Router()

// budget for admin 
budgetRouter
    .route('/budget')
    .post(protectedRouter, validation(addBudgetVal), allowedTo('admin'), addBudget)
    .get(protectedRouter, allowedTo('admin'), getBudgets)
budgetRouter.route('/budget/admin/:id')
    .post(protectedRouter, validation(updateBudgetVal), allowedTo('admin'), adminUpdateBudget)
    .delete(protectedRouter, validation(paramsIdVal), allowedTo('admin'), deleteBudget)
budgetRouter.route('/budget/delete/:id').post(protectedRouter, validation(paramsIdVal), allowedTo('admin'), deleteBudget)


// budget for user 

// user with edit peremation can edit and with view can view 
budgetRouter.route('/budget/user/:id')
    .post(protectedRouter, validation(updateBudgetVal), allowedTo('user'), userUpdateBudget)
budgetRouter.route('/user/budgets')
    .get(protectedRouter, allowedTo('user'), getBudetsForUser)

export default budgetRouter