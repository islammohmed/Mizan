import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addUser } from './controller/user.js'
import { addUserVal } from './user.validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from './../..//middleware/allowedTo.js'
import { checkEmail } from './../../middleware/checkEmail.js'
const userRouter = express.Router()
userRouter
    .route('/admin/create')
    .post(protectedRouter, validation(addUserVal), checkEmail, allowedTo('admin'), addUser)
export default userRouter