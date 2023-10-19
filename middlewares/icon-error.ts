import { __Request, __Response, __NextFunction } from "../global";

function HandleIconError(req: __Request, res: __Response, next: __NextFunction) {
    if (req.url === '/favicon.ico') return res.end();
    return next();
}

export default HandleIconError;