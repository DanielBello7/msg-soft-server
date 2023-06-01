import dotenv from 'dotenv';
import path from 'path';
const environment_type = process.env.NODE_ENV as string;
const environment_path = path.join(__dirname, `../../env/${environment_type}.env`);
export default () => dotenv.config({ path: environment_path });