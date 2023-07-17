
import EventEmitter from "events";
import server from './server/server';
import Repository from './repository/Repository';
import config from "./config";
import Operations from './repository/Operations';
import InitSystem from "./logic/system-operations/InitSystem";

const mediator = new EventEmitter();


console.log('--- Micro Service ---')
console.log('Connecting to repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

mediator.on('db.ready', async (db:any) => {
  let disconnect_operation:any;
  let repository = new Repository(db.connection);
      repository.setOperationList(Operations);
  let database_operations = await repository.connect();
      console.log('Connected. Starting Server')
      disconnect_operation = database_operations.disconnect
      await InitSystem.initializeRootUser(database_operations);
      server.start({
        port: config.serverSettings.port,
        // ssl: config.serverSettings.ssl,
        database_operations,
      })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () => {
        disconnect_operation()
      })
    })
})
mediator.on('db.error', (err:any) => {
  console.error(err)
})
config.db.connect(config.dbSettings, mediator)
mediator.emit('boot.ready')

