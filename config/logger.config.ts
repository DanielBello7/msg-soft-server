import bunyan from 'bunyan';
const log = bunyan.createLogger({ name: 'logger', level: 'info' });
export default log
