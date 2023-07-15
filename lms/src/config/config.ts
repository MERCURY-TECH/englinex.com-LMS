const dbSettings = {
  db: process.env.DB || 'CamBar',
  dbName : process.env.DB || 'Baro-Vote',
  // servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [ '127.0.0.1:27017'],
  servers: ['barovote:barovote@cluster0.cou3jw2.mongodb.net/?retryWrites=true&w=majority'],
  autoIndex :false,
  dbParameters: () => ({
    w: 'majority',
    wtimeoutMS: 10000,
    journal: true,
  })
}

const serverSettings = {
  port: 80,
  // port: process.env.NODE_ENV ? 80 :3000,
}

export { dbSettings, serverSettings };
