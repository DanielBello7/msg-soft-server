import Handle404Error from './middlewares/404-error';
import HandleIconError from './middlewares/icon-error';
import SecretConfig from './config/secret.config';
import routes from './routes/index.routes';
import variables from './constants/variables';
import path from 'path';
import express from 'express';
import cors from 'cors';

export default function ServerApplication(whitelist: string[]) {
    const app = express();

    app.use(cors({
        credentials: true,
        origin: whitelist
    }));
    app.use(express.json({ limit: variables.DATA_LIMIT }));
    app.use('/static', express.static(path.join(__dirname, "/static")));
    app.use(express.urlencoded({ extended: true }));
    app.use(SecretConfig);
    app.use(HandleIconError);

    app.use('/', routes());

    app.use(Handle404Error);

    return app;
}
