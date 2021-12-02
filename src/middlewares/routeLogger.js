import {logger} from '../utils/logger.js';

export const infoRouteLogger = (req,res,next)=>{
  logger.warn(`Ruta: ${req.path}, metodo: ${req.method}`);
  next();
}