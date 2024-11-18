import joi from 'joi'
const addCreditsVal = joi.object({
    budgetId: joi.string().hex().length(24).required(),
    name: joi.string().min(3).max(100).trim().required(),
    reason: joi.string().required(),
    allocation: joi.number().positive().required()
});
export {
    addCreditsVal
}