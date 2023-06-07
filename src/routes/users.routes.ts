import { UsersJSONService } from '../services/JSONDatabase.service';
import express from 'express';
const router = express.Router();

export default () => {
    router.get('/', async (req, res) => {
        const users = await UsersJSONService.GetDocuments();
        return res.json({ msg: 'users', payload: users });
    });

    return router;
}