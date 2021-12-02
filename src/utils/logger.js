import log4js from 'log4js';

log4js.configure({
  appenders:{
    consola:{type:"console"},
    archivoWarning:{type:"file",filename:"warning.log"},
    archivoErrores:{type:"file",filename:"errors.log"},
    
    loggerConsole:{type:"logLevelFilter", appender:'consola',level:'info'},
    loggerArchivoWarning:{type:"logLevelFilter", appender:'archivoWarning',level:'warning'},
    loggerArchivoErrores:{type:"logLevelFilter", appender:'archivoErrores',level:'error'},
  },
  categories:{
    default:{appenders:["loggerConsole"], level:"all"},
    prod:{appenders:["loggerArchivoWarning","loggerArchivoErrores","loggerConsole"], level:"all"}
  }
})

export const logger = log4js.getLogger();