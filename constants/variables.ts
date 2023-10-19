import environment_configurations from '../config/environments.config';
environment_configurations();

const PORT = process.env.PORT as string
const DATA_LIMIT = process.env.DATA_LIMIT as string
const SECRET = process.env.SECRET as string

export default {
    PORT,
    SECRET,
    DATA_LIMIT
}
