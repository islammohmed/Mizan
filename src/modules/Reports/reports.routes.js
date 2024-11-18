import express from 'express'
import { protectedRouter } from '../auth/controller/auth.js'
import allowedTo from '../../middleware/allowedTo.js'
import { getMonthlyReport } from './controller/reports.js'
const reportRouter = express.Router()

reportRouter.route('/monthly-report').get(protectedRouter, allowedTo('admin'), getMonthlyReport)


export default reportRouter