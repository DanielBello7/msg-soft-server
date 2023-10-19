import Handle404Error from './middlewares/404Error';
import HandleIconError from './middlewares/iconError';
import SecretConfig from './config/secret.config';
import routes from './routes/index.routes';
import variables from './constants/variables';
import path from 'path';
import express from 'express';
import cors from 'cors';

const ServerApplication = (whitelist: string[]) => {
    const app = express();

    app.use(cors({ credentials: true, origin: whitelist }));
    app.use(express.json({ limit: variables.DATA_LIMIT }));
    app.use('/static', express.static(path.join(__dirname, "/static")));
    app.use(express.urlencoded({ extended: true }));
    app.use(SecretConfig);
    app.use(HandleIconError);

    app.use('/', routes());

    app.use(Handle404Error);

    return app;
}

export default ServerApplication;