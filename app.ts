import handleNotFoundError from './middlewares/handle-not-found-error';
import handleIconError from './middlewares/handle-icon-error';
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
    app.use(handleIconError);

    app.use('/', routes());

    app.use(handleNotFoundError);

    return app;
}
