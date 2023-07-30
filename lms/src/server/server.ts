import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import API from '../api/http-api/API';
import { Server } from 'http';
import http from "http";
import bodyParser from 'body-parser';
import {config as configDotenv} from 'dotenv'
import path from 'path';
import RealTimeVoteCommunicator from '../api/socket/socket';
import cors from 'cors';
import SubscriptionManager from '../logic/subscription-manager/subscription-manager';


export default class server{
  public static start(options:any):Promise<any>{
    return new Promise((resolve, reject)=>{
      if (!options.database_operations) {
        reject(new Error('The server must be started with a connected repository'))
      }
      if (!options.port) {
        reject(new Error('The server must be started with an available port'))
      }
      configDotenv({path: '../.env'})
      const app = express()
      app.use('/images',express.static(path.join(__dirname, "../../images")));
      app.use('/',express.static(path.join(__dirname, '../../dist')));
      app.use(morgan('dev'))
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(helmet());
      app.use(cors());
      app.use((err:any, req:any, res:any, next:any) => {
        reject(new Error('Something went wrong!, err:' + err))
        res.status(500).send('Something went wrong!')
      });
      new API(app, options.database_operations);
      new SubscriptionManager(options.database_operations).startWorker();
      const httpserver = http.createServer(app);
      new RealTimeVoteCommunicator(httpserver);
      const server:Server = httpserver.listen(options.port, () => resolve(server))
    })
  }
}

