import { UsersJSONService } from '../services/JSONDatabase.service';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Server, Socket } from 'socket.io';
import http from 'http';

interface ExtendedSocket extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
    _id?: string
    fullname?: string
}

async function SocketConnection(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
    whitelist: string[]
) {
    const io = new Server(server, {
        cors: {
            origin: whitelist
        }
    });

    io.use((socket: ExtendedSocket, next) => {
        const id = socket.handshake.auth._id
        const fullname = socket.handshake.auth.fullname
        socket._id = id;
        socket.fullname = fullname;
        next();
    })

    io.on('connection', async (client) => {
        const socket: ExtendedSocket = client
        if (!socket._id) return
        const roomSockets = await io.in(socket._id).fetchSockets();
        const all = roomSockets.map((item) => item.id);
        if (!all.includes(socket._id)) client.join(socket._id);

        const socketUser = {
            _id: socket.id,
            fullname: socket.fullname
        }

        const result = await UsersJSONService.FindDocument({ _id: socketUser._id })
        if (!result) await UsersJSONService.AddDocument(socketUser as any);

        client.on('outgoing', (data, room) => {
            room.id.forEach((id: string) => client.to(id).emit('incoming', data))
        });

        client.on('disconnect', async () => {
            const result = await UsersJSONService.FindDocument({ _id: socketUser._id })
            if (result) await UsersJSONService.DeleteDocument(socketUser);
        });
    });

    io.on('error', (error) => {
        throw new Error(error);
    });
}

export default SocketConnection;