
import { ILogic, authorizeUserMiddleWare } from "../../logic";
import AuthorizationManager from "../../logic/authorization-manager/AuthorizationManager";
import { routeSecurityLevel } from "../../logic/lms-interfaces";;
import routes from './Routes';
/**
 * @description Handles all service specific API's
 * @class API
 * @version 1.0
 * @author mercury-tech
 */

export default class API {
    app:any;
    database_operations:Array<ILogic>;
    adminAuthz:any

  /**
   * @constructs API | Creates a new instance of a repository
   * @param connection | connection to a database
   */
  constructor(app:any,database_operations:Array<ILogic>) {
    this.app = app;
    this.database_operations = database_operations;
    this.setRoutes();
  }

  get routeStructure(){
    return routes(this.database_operations);
  }

  /**
   * @description constructs routes for the server
   */
  private setRoutes(){
    const service_routes = routes(this.database_operations).actions.length>0 ? routes(this.database_operations).actions : [];
    const adminAuthz  = new AuthorizationManager(this.routeStructure, this.database_operations)
    service_routes.forEach(async (element:any) => {
      if(element.actionScope === routeSecurityLevel.protected){
        return this.app[element.method](element.route,authorizeUserMiddleWare,element.middleware?element.middleware:(req:any,res:any,next:any)=>{next()},element.callback);
      }
      if(element.actionScope === routeSecurityLevel.forbiden){
        return this.app[element.method](element.route,adminAuthz.validateAction(element.actionName as string),
        element.middleware?element.middleware:(req:any,res:any,next:any)=>{next()},element.callback);
      }
      this.app[element.method](element.route,element.middleware?element.middleware:(req:any,res:any,next:any)=>{next()},element.callback);
    });
  }
}

  