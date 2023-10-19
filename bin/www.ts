import "module-alias/register";
import { variables } from '@/constants';
import environment_configurations from "@/config/environments.config";
import socketConnection from "@/modules/socket-connection";
import log from "@/config/logger.config";
import app from "@/app";
import ip from 'ip';
import http from 'http';

environment_configurations();

const whitelist = [
    "http://localhost:5173",
]

const serverApp = app(whitelist);
const server = http.createServer(serverApp);
const port = variables.PORT;
const addr = ip.address();

serverApp.set('port', port);
serverApp.set('address', addr);

function onListening() {
    log.info(`server active on http://${addr}:${port}`);
}

function onError(error: any) {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            log.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            log.error(bind + ' is already in use');
            process.exit(1);
        default: throw error;
    }
}

server.on('error', onError);
server.on('listening', onListening);
server.listen(port, () => {
    socketConnection(server, whitelist);
});
