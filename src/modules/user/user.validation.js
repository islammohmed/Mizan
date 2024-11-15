
import joi from 'joi'
const addUserVal = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().required()
})
export {
    addUserVal,
}