import express from 'express'
import { validation } from '../../middleware/validation.js'
import allowedTo from '../../middleware/allowedTo.js'
import { protectedRouter } from '../auth/controller/auth.js'
import { addCreditVal } from './credits.validation.js'
import { addCredits, getCredits } from "./controller/credits.js"
const creditsRouter = express.Router()
creditsRouter
    .route('/credits')
    .post(protectedRouter, validation(addCreditVal), allowedTo('user'), addCredits)
    .get(protectedRouter, allowedTo('admin'), getCredits)
export default creditsRouter