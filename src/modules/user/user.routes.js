import express from 'express'
import { validation } from '../../middleware/validation.js'
import { addUser, deleteUser, getSingleUser, getUsers, updateUser } from './controller/user.js'
import { addUserVal, paramsIdVal, updateUserVal } from './user.validation.js'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from './../..//middleware/allowedTo.js'
import { checkEmail } from './../../middleware/checkEmail.js'
const userRouter = express.Router()
userRouter
    .route('/admin/create')
    .post(protectedRouter, validation(addUserVal), checkEmail, allowedTo('admin'), addUser)
userRouter.route('/user')
    .get(protectedRouter, allowedTo('admin'), getUsers)
userRouter.route('/user/:id')
    .put(protectedRouter, allowedTo('admin'), validation(updateUserVal), updateUser)
    .get(protectedRouter, allowedTo('admin'), validation(paramsIdVal), getSingleUser)
    .delete(protectedRouter, allowedTo('admin'), validation(paramsIdVal), deleteUser)
export default userRouter