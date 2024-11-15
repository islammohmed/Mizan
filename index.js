import express from 'express'
import dbConnection from './db/dbConnection.js'
import { config } from 'dotenv'
import { bootstrab } from './src/modules/index.routes.js'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { AppError } from './src/utils/AppError.js'
import { globalError } from './src/middleware/globalError.js'
const app = express()
dbConnection()
config()
app.use(cors())

app.use(express.json())
bootstrab(app)
app.use('*', (req, res, next) => {
    next(new AppError('url not founded', 404))
})
app.use(globalError)
const port = 3000
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
})