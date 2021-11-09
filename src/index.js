import cluster from 'cluster';
import { cpus } from 'os';
import minimist from "minimist";
import dotenv from "dotenv";
import app from './server.js';
dotenv.config();

const optionsMinimist = {
  alias:{
    p:'puerto',
  },
  default:{
    puerto:8080,
    modo:'fork'
  }
};
const arg = minimist(process.argv.slice(2),optionsMinimist);
console.log(arg);
const {puerto:port,modo} = arg;

if (modo == 'cluster' && cluster.isMaster) {
  const numCPUs = cpus().length;
  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log('Worker', worker.process.pid, 'exited on: ', new Date().toLocaleString());
    cluster.fork()
  })
} else {
  process.on('exit', code => {
    console.log('Salida con código de error: ' + code)
  })

  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
  })
}
