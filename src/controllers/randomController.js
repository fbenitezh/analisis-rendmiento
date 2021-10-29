import { fork } from 'child_process';
//@ts-check

class RandomController{
  /** 
  * @type {number}
  */ 
  calcularAleatorio(req,res){
    const numero = req.query.cantidad ? +req.query.cantidad : 100000000;
    const randomsFork = fork('./src/utils/random.number.utils.js');
    randomsFork.on('message', respuestaChild => {
      if (respuestaChild == 'ready') {
        randomsFork.send(numero)
      } else {
        /** 
        * @type {string} 
        */ 
        const resultadoJson = JSON.stringify(respuestaChild)
        res.status(200).end(resultadoJson);
        randomsFork.kill();
      }
    }); 
  }
}

export default RandomController;
