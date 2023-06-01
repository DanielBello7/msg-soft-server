import environment_configurations from "../config/environments.config";
import SocketConnection from "../middlewares/connection";
import ServerApplication from "../app";
import http from 'http';
import log from "../config/logger.config";
import variables from '../constants/variables';

const whitelist = ["http://localhost:5173"]
environment_configurations();
const app = ServerApplication(whitelist);
const server = http.createServer(app);
const port = variables.PORT;

app.set('port', port);

function onListening() {
    const address = server.address();
    const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address?.port;
    log.info('server active on http://localhost:' + bind);
}

function onError(error: any) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

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