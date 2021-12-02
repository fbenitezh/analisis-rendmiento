# Analisis de rendimiento

## Scripts principales

`yarn dev`
Inicia el servidor en modo desarrollo corriendo en el puerto 8080 en modo prof

`yarn start`
Inicia el servidor en modo productivo corriendo en el puerto 8080 en modo prof

`yarn dev:inspect`
Inicia el servidor en modo desarrollo corriendo en el puerto 8080 en modo inspect

`yarn start:0x`
Inicia el servidor con 0x para el analisis con autocannon

`yarn test:autocannon`
Ejecuta el script que realiza el analisis con autocannon sobre la ruta /info


### Perfilamiento del servidor con prof y procesamiento con --prof-process

#### Modo bloqueante
1. `yarn dev`
2. `artillery quick --count 50 -n 20 "http://localhost:8080/info" > resultBloq.txt`
3. Renombrar el archivo log creado por el servidor en modo --prof por `bloq-v8.log`
4. Decodificar el log con `node --prof-process bloq-v8.log > result_prof-bloq.txt`

#### Modo no bloqueante
1. `yarn start`
2. `artillery quick --count 50 -n 20 "http://localhost:8080/info" > resultNoBloq.txt`
3. Renombrar el archivo log creado por el servidor en modo --prof por `noBloq-v8.log`
4. Decodificar el log con `node --prof-process noBloq-v8.log > result_prof-nobloq.txt`



### Analisis con autocannon
1. `start:0x`
2. `test:autocannon` para generar las conexiones
3. Matar el proceso para obtener los graficos 0x
