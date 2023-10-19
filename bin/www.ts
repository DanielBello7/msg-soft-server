import environment_configurations from "../config/environments.config";
import SocketConnection from "../modules/connection";
import ip from 'ip';
import ServerApplication from "../app";
import http from 'http';
import log from "../config/logger.config";
import variables from '../constants/variables';

const whitelist = [
    "http://192.168.200.34:5173",
    "http://192.168.200.32:5173",
    "http://192.168.200.112:5173",
    "http://localhost:5173",
]

environment_configurations();
const app = ServerApplication(whitelist);
const server = http.createServer(app);
const port = variables.PORT;
const addr = ip.address();

app.set('port', port);
app.set('address', addr);

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

SocketConnection(server, whitelist);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);