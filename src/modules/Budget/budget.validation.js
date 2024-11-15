import joi from 'joi'
const addBudgetVal = joi.object({
    name: joi.string().min(2).max(100).required(),
    desc: joi.string(),
    allocation: joi.string(),
})
const updateBudgetVal = joi.object({
    id: joi.string().hex().length(24).required(),
    expenses: joi.number(),
    allocation: joi.number(),
})
export {
    addBudgetVal,
    updateBudgetVal
}