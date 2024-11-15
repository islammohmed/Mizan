import express from 'express'
import { validation } from './../../../src/middleware/validation.js'
import { signInValidation } from './auth.validation.js'
import { signIn } from './controller/auth.js'
const authRouter = express.Router()
authRouter.post('/admin/login', validation(signInValidation), signIn)
export default authRouter