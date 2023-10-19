import express from 'express';
import users from './users.routes';
const router = express.Router();

export default () => {
    router.use('/users', users());

    return router;
}