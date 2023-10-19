import { __Request, __Response } from '@/global';
import UsersModel from '@/services/users-json-service';
import express from 'express';
const router = express.Router();

export default () => {
    router.get('/', async (req, res) => {
        const users = await UsersModel.GetDocuments();
        return res.json({
            msg: 'users',
            payload: users
        });
    });

    router.post('/', async (req, res) => {
        if (
            !req.body.email ||
            !req.body.fullname ||
            !req.body.password
        ) return res.status(400).send('incomplete data');
        const user = {
            _id: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
            createdAt: new Date().toLocaleDateString()
        }
        const check = await UsersModel.FindDocument({
            _id: user._id
        });
        if (check)
            return res.status(401).send('user already registered');
        const data = await UsersModel.AddDocument(user);
        return res.json({
            msg: "user created",
            payload: data
        });
    });

    return router;
}
