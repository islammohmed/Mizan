import joi from 'joi';

// Validation for adding a new user
const addUserVal = joi.object({
    name: joi.string().min(2).max(100).trim().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('user', 'admin').default('user'),
    budgets: joi.array().items(
        joi.object({
            budgetId: joi.string().hex().length(24).required(),
            permission: joi.string().valid('view', 'edit').required()
        })
    ).optional() // `budgets` is optional when adding a new user
});

// Validation for validating params with an ID
const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
});

// Validation for updating a user
const updateUserVal = joi.object({
    id: joi.string().hex().length(24).required(),
    name: joi.string().min(2).max(100).trim().optional(),
    email: joi.string().email().optional(),
    password: joi.string().min(6).optional(),
    role: joi.string().valid('user', 'admin').optional(),
    budgets: joi.array().items(
        joi.object({
            budgetId: joi.string().hex().length(24).required(),
            permission: joi.string().valid('view', 'edit').required()
        })
    ).optional() // Allow updating budgets with permissions
});

export {
    addUserVal,
    paramsIdVal,
    updateUserVal
};
