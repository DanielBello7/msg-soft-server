import { ParticipantsDataType } from '@/global';
import JSONFileServiceHandler from './json-database-service';
import path from 'path';

const folder_path = path.join(__dirname, "../database");
const UsersJSONService = new JSONFileServiceHandler<ParticipantsDataType>("USERS", folder_path);

UsersJSONService._init_();

export default UsersJSONService;
