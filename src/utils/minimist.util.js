import { 
  argv, 
  platform, 
  version, 
  memoryUsage, 
  execPath,
  cwd, 
  pid
} from 'process';

const cliArgs = argv.slice(2).join(' ').toString();

export const processInfo = {
  commandLineArgs: cliArgs,
  sistemaOperativo: platform,
  nodeVersion: version,
  memoriaRSS: memoryUsage().rss,
  nodePath: execPath,
  projectPath: cwd(),
  processId: pid
}