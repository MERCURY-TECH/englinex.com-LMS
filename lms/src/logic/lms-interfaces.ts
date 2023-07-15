export type vote = "president-de-lassembler" | "vice-president-de-lassembler" | "membre-du-consceille-de-lordre" | "le-batonier" | "none";
export enum voteTypeList {
  "presidentdelassembler" = "president-de-lassembler",
  "vicepresidentdelassembler" = "vice-president-de-lassembler",
  "membreduconsceilledelordre" = "membre-du-consceille-de-lordre",
  "lebatonier" = "le-batonier",
  "none" = "none"
};

export enum voteObjectTypeEnum {
  "resolution" ="resolution" , 
  "lawyer"= "lawyer"
}
export type voteObjectType =  "resolution" | "lawyer";


export type routeType = 'public' | 'protected' | 'forbiden';

export enum routeSecurityLevel {
  public = "public",
  protected = "protected",
  forbiden = "forbiden",
}


export interface ILogic{
  name:string,
  callback:(collection: any) =>any,
  error:(err:any)=>void,
}

interface serviceAction {
  actionName: String,
  route: String,
  routeDescription?: string,
  method: string,
  middleware?:Function,
  req?: {
    params?: { [key: string]: any },
    query?: { [key: string]: any },
    body?: { [key: string]: any },
    headers?: {
      authorization?: { [key: string]: any },
      contenType?:string
    }
  },
  response?: {
    [key: number]: {
      body?: { [key: string]: any },
      headers?: {
        contenType?: string
      }
    }
  }
  actionScope: routeSecurityLevel,
  callback: Function
}

export interface serviceRoutes {
  serviceName: String,
  serviceDescription?: string,
 
  version: String,
  baseUrl: String,
  actions: Array<serviceAction>
}



export interface IUser {
  username: any;
  phonenumber: any;
  adress: any;
  userRole: any;
  _id: any;
  firstname: String,
  lastname: String,
  email: String,
  telephone: String,
  biometry?: String,
  profilePicture?: String,
  isCandidate?: Boolean,
  voteCount?: Number,
  manifeste?: String,
  description?: String,
  isActive?: Boolean,
  isSuspended?: Boolean
}