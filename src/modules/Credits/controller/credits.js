
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { CreditsModel } from '../../../../db/models/Credits.model.js'
import { userModel } from '../../../../db/models/user.model.js';


const addCredits = catchError(async (req, res, next) => {
    // Step 1: Fetch the user from the database
    const user = await userModel.findById(req.user._id).select('budgets');
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    // Step 2: Check if the user has 'edit' permission for the given budget
    const userBudget = user.budgets.find(
        budget => budget.budgetId.toString() === req.params.budgetId && budget.permission === 'edit'
    );
    if (!userBudget) {
        return next(new AppError('Permission denied: You can only view this budget', 403));
    }
    req.body.userId = req.user._id
    let Credits = new CreditsModel(req.body)
    await Credits.save()
    !Credits && next(new AppError('invalid data', 404))
    Credits && res.send({ msg: 'success', Credits })
})
const getCredits = catchError(async (req, res, next) => {
    let Credits = await CreditsModel.find().populate({
        path: 'userId',
        select: '-_id name email role'
    });
    res.send({ msg: "success", Credits })
})
export {
    addCredits,
    getCredits,
}