import express from 'express'
import { validation } from '../../middleware/validation.js'
import allowedTo from '../../middleware/allowedTo.js'
import { protectedRouter } from '../auth/controller/auth.js'
import { addCreditsVal } from './credits.validation.js'
import { addCredits, getCredits } from "./controller/credits.js"
const creditsRouter = express.Router()
creditsRouter
    .route('/credits')
    .get(protectedRouter, allowedTo('admin'), getCredits)

creditsRouter
    .route('/credits/:budgetId')
    .post(protectedRouter, validation(addCreditsVal), allowedTo('user'), addCredits)
export default creditsRouter