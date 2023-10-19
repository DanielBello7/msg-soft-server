import { __Request, __Response, __NextFunction } from "../global";
export default function handleNotFoundError(req: __Request, res: __Response) {
    return res.status(404).send('page not found');
}