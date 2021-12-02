import { logger } from '../utils/logger.js';
import { listaRandoms } from '../utils/random.number.utils.js';
//@ts-check

class RandomController{
  /** 
  * @type {number}
  */ 
  calcularAleatorio(req,res){
    try {
      const numero = req.query.cantidad ? +req.query.cantidad : 100000000;
      logger.info(`Cantidad ${numero}`);
  
      const result = listaRandoms(numero);
      
      res.send({resultado:result});
    } catch (error) {
      logger.error(error);
    }
  }
}

export default RandomController;
