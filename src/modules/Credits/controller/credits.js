
import { catchError } from '../../../middleware/catchError.js'
import { AppError } from '../../../utils/AppError.js'
import { CreditsModel } from '../../../../db/models/Credits.model.js'


const addCredits = catchError(async (req, res, next) => {
    let Credits = new CreditsModel(req.body)
    await Credits.save()
    !Credits && next(new AppError('invalid data', 404))
    Credits && res.send({ msg: 'success', Credits })
})
const getCredits = catchError(async (req, res, next) => {
    let Credits = await CreditsModel.find()
    res.send({ msg: "success", Credits })
})
export {
    addCredits,
    getCredits,
}