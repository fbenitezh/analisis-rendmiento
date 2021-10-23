
process.on('message',number=>{
  let listaRepetidos = {};
  for (let index = 1; index <= number; index++) {
    let randomNumber = Math.floor(Math.random() * (1000 - 1) + 1); 
    if(listaRepetidos[randomNumber] == null){
      listaRepetidos[randomNumber] = 1;
    }else{
      listaRepetidos[randomNumber]++;
    }
  }
  process.send(listaRepetidos);
});

process.send("ready");