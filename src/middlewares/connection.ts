import { Server, Socket } from 'socket.io';
import http from 'http';
import log from '../config/logger.config';

function SocketConnection(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>, whitelist: string[]) {
    const io = new Server(server, { cors: { origin: whitelist } });

    async function CreateConnection(): Promise<Socket> {
        return new Promise((resolve, reject) => {
            io.on('connection', (client) => resolve(client));
            io.on('error', (error) => reject(error));
        });
    }

    CreateConnection()
        .then((client) => {
            log.info('a connection was just made');
        })
        .catch((error) => null)
}

export default SocketConnection;