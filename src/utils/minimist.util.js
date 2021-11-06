import { 
  argv, 
  platform, 
  version, 
  memoryUsage, 
  execPath,
  cwd, 
  pid
} from 'process';
import os from 'os';
const numCPUs = os.cpus().length;

const cliArgs = argv.slice(2).join(' ').toString();

export const processInfo = {
  commandLineArgs: cliArgs,
  sistemaOperativo: platform,
  nodeVersion: version,
  memoriaRSS: memoryUsage().rss,
  nodePath: execPath,
  projectPath: cwd(),
  processId: pid,
  cpus:numCPUs
}