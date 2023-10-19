import { __Request, __Response, __NextFunction } from "../global";
import variables from "../constants/variables";

function SecretConfig(req: __Request, res: __Response, next: __NextFunction) {
    req.secret = variables.SECRET as string;
    return next();
}

export default SecretConfig;