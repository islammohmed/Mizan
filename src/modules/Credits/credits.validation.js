import joi from 'joi'
const addCreditVal = joi.object({
    name: joi.string().min(2).max(100).required(),
    reason: joi.string(),
    allocation: joi.number()
})
export {
    addCreditVal
}