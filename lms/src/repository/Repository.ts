/**
* @description Repository 
* @version 1.0
* @since 2023
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import mongoose from "mongoose";
import { ILogic } from "./IOperations";


export default class Repository{
  [x: string]: any;
  /**
   * database live connection
   */
  public connection: any;

  /**
   * @description database collection to access
   */
  private collection:any;

  /**
   * @description list of database operations
   */
  private operationList: Array<ILogic> = [];

  static instance:Repository;

  /**
   * @constructs Repository | Creates a new instance of a repository
   * @param connection | connection to a database
   */
  constructor(connection: any) {
    this.connection = connection;
    if(Repository.instance){
      return Repository.instance;
    }
    Repository.instance = this;
  }

  /**
   * Uses closure to create a con
   * @returns {Promise} 
   */
  connect():Promise<any> {
    return new Promise((resolve, reject) => {
      if (! this.connection) {
        reject(new Error('connection db not supplied!'));
      }
      resolve(this.operations());
    })
  }
  
  setOperationList(operationList:Array<ILogic>){
    this.operationList = operationList;
  }
  
  /**
   * @param collectionName name of the database collection 
   * @returns {Object} Returns and objec that contains callback functions for API request
   */
  operations():Object {
    const opsObj:{[key: string]: Function} = {};
    this.operationList.forEach(element => {
      opsObj[element.name] = element.callback
    });
    const disconnect = () => {
      mongoose.connection.close()
    }

    return Object.create({
      // add all export functions here
      ...opsObj,
      disconnect
    })
  }
}



