import log from '../config/logger.config';
import http from 'http';
import { Server } from 'socket.io';
import { ParticipantsDataType } from '../global';

async function SocketConnection(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
    whitelist: string[],
    users: ParticipantsDataType[]
) {
    const io = new Server(server, { cors: { origin: whitelist } });

    io.use((socket: any, next) => {
        const id = socket.handshake.auth._id
        const fullname = socket.handshake.auth.fullname
        socket.id = id;
        socket.fullname = fullname;
        next();
    })

    io.on('connection', (client) => {
        const socket: any = client
        users = [...users, { _id: socket.id, fullname: socket.fullname }];

        log.info(`client just connected with id ${socket.id} and name ${socket.fullname}`);

        client.on('disconnect', () => {
            const data = users.filter((item) => item._id !== socket.id);
            return users = [...data];
        });
    });

    io.on('error', (error) => {
        throw new Error(error);
    });
}

export default SocketConnection;