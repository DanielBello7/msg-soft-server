import { __Request, __Response, __NextFunction } from "../global";
import { variables } from "@/constants";
export default function SecretConfig(req: __Request, res: __Response, next: __NextFunction) {
    req.secret = variables.SECRET as string;
    return next();
}
