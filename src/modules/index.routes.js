import { globalError } from "../middleware/globalError.js";
import authRouter from "./auth/auth.routes.js";
import budgetRouter from "./Budget/budget.routes.js";
import creditsRouter from "./Credits/gredits.routes.js";
import userRouter from "./user/user.routes.js";
export const bootstrab = (app) => {
    app.use('/api/v1', userRouter)
    app.use('/api/v1', authRouter)
    app.use('/api/v1', budgetRouter)
    app.use('/api/v1', creditsRouter)
    app.use(globalError)
} 