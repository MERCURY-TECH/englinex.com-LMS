/**
 * @author Mercury-tech
 * @since 2023
 */
import EventEmitter from 'events';
import mongoose, { Mongoose } from 'mongoose';
/**
 * @description  Abstracts connection to database, and provides a database connection singleton
 * @class Database
 */
export default class DataBase {
  /**
   * @description singleton of database
   */
  static instance: DataBase;

  public connection: Mongoose | undefined;

  /**
   * @constructor DataBase
   * @returns Create or return a database Singleton
   */
  constructor() {
    if (DataBase.instance) {
      return DataBase.instance;
    }
    DataBase.instance = this;
  }

  /**
   * 
   * @param options 
   * @returns 
   * @example 
   */
  public getMongoURL(options: any) {
    const url = options.servers.reduce((prev: any, cur: any) => prev + cur + ',', 'mongodb+srv://');
    // const url = options.servers.reduce((prev: any, cur: any) => prev + cur + ',', 'mongodb://');
    return `${url.substr(0, url.length - 1)}/${options.db}`;
  }

  /**
   * 
   * @param options 
   * @param mediator 
   */
  public connect(options: any, mediator: EventEmitter) {

    mediator.once('boot.ready', async () => {
      try {
        const uri: string = this.getMongoURL(options)
        // mongodb+srv://barovote:barovote@cluster0.cou3jw2.mongodb.net/?retryWrites=true&w=majority
        const db: Mongoose = await mongoose.connect(uri, { dbName: options.dbName, ...options.dbParameters() });
        console.log('connected to the database');
        this.connection = db;
        mediator.emit('db.ready', this);
      } catch (err: any) {
        if (err) {
          mediator.emit('db.error', err)
        }
      }
    })
  }
}
