import { __Request, __Response, __NextFunction } from "../global";

function Handle404Error(req: __Request, res: __Response) {
    return res.status(404).send('page not found');
}

export default Handle404Error;