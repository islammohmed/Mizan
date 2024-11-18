
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { userModel } from './../../../../db/models/user.model.js'


const addUser = catchError(async (req, res, next) => {
    let user = new userModel(req.body)
    await user.save()
    !user && next(new AppError('invalid data', 404))
    user && res.send({ msg: 'success', user: { name: user.name, email: user.email } })
})
const updateUser = catchError(async (req, res, next) => {
    const { name, budgets } = req.body;
    // Step 1: Fetch the user from the database
    console.log(req.params.id);
    const user = await userModel.findById(req.params.id);
    console.log(user);

    if (!user) {
        return next(new AppError('User not found', 404));
    }
    // Step 2: Update user's name if provided
    if (name) {
        user.name = name;
    }
    // Step 3: Update budgets if provided
    if (budgets && Array.isArray(budgets)) {
        budgets.forEach(({ budgetId, permission }) => {
            // Check if the budget already exists
            const existingBudget = user.budgets.find(
                (budget) => budget.budgetId.toString() === budgetId
            );
            if (existingBudget) {
                // Update the permission if budget exists
                existingBudget.permission = permission;
            } else {
                // Add a new budget entry if it doesn't exist
                user.budgets.push({ budgetId, permission });
            }
        });
    }
    // Step 4: Save the updated user
    const updatedUser = await user.save();
    res.status(200).send({ msg: "success", updatedUser });
});


const deleteUser = catchError(async (req, res, next) => {
    await userModel.findByIdAndDelete(req.user._id)
    res.send({ msg: "success" })
})

const getUsers = catchError(async (req, res, next) => {
    let users = await userModel.find().populate({
        path: 'budgets.budgetId',
        select: 'name'
    })
    res.send({ msg: "success", users })
})

const getSingleUser = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id)
    res.send({ msg: "success", user })
})



export {
    addUser,
    updateUser,
    deleteUser,
    getUsers,
    getSingleUser
}