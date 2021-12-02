import cluster from 'cluster';
import { cpus } from 'os';
import minimist from "minimist";
import dotenv from "dotenv";
import app from './server.js';
import { logger } from './utils/logger.js';
dotenv.config();

const optionsMinimist = {
  alias:{
    p:'port',
  },
  default:{
    port:8080,
    modo:'fork'
  }
};
const arg = minimist(process.argv.slice(2),optionsMinimist);
logger.info(arg);
const {port,modo} = arg;

if (modo == 'cluster' && cluster.isMaster) {

  logger.info("creando cluster");
  const numCPUs = cpus().length;
  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    logger.warn('Worker', worker.process.pid, 'exited on: ', new Date().toLocaleString());
    cluster.fork()
  })
} else {
  process.on('exit', code => {
    logger.error('Salida con código de error: ' + code)
  })

  app.listen(port, () => {
    logger.info(`Server running on: http://localhost:${port}`)
  })
}
