import dotenv from 'dotenv';
import path from 'path';

const environment_type = process.env.NODE_ENV as string;
const lang = process.env.NODE_LANG as string;
const location = lang === "JS" ? `../../env/${environment_type}.env` : `../env/${environment_type}.env`;
const environment_path = path.join(__dirname, location);

export default () => dotenv.config({ path: environment_path });
