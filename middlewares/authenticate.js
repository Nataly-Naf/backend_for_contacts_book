import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken"
import "dotenv/config";
import  User  from "../models/users.js";

const {JWT_SECRET} = process.env

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;

    if (!authorization) {
      return next(HttpError(401, 'Authorization not define'))  
    }
   const [bearer, token] = authorization.split(" ");

    if (bearer != "Bearer") {
                
        next(HttpError(401))
    }
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || token !== user.token) {
            return next(HttpError(401));
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpError(401))
    }
}
export default authenticate;
