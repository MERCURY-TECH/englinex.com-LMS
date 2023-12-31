
export type routeType = 'public' | 'protected' | 'forbiden';

export enum routeSecurityLevel {
  public = "public",
  protected = "protected",
  forbiden = "forbiden",
}

export enum SubscriptionEvents {
  'newSubscription'='new-subscription',
  'updateSubscription' = 'update-subscription',
  'subscriptionEnded' = 'subscription-ended',
  'validSubscriptionPayment' = 'validSubscriptionPayment'
}

export interface ILogic{
  name:string,
  callback:Function
}

export interface IClassSchedule {
  datetime:Date,
  course:string,
  student:string,
  lecturer:string,
  relatedCourseMaterial:string,
  isConfirmed:boolean,
  classUrl:string
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
export enum AccountActivityType {
  "accountActivation"="activation",
  "passwordRecovery" = "recovery"
}


export enum AccountType{
  "student"="student",
  "lecturer" = "lecturer",
  "admin"="admin"
}

export enum EnglishProficiency{
  "Beginner"="Beginner",
  "Elementary"="Elementary",
  "PreIntermediate"="Pre-Intermediate",
  "Intermediate"="Intermediate",
  "UpperIntermediate"="Upper-Intermediate",
  "Advanced"="Advanced"
}

export enum LearningGoals {
  "EnglishExams"="English exams (TOEFL/IELTS)",
  "BusinessEnglish"="Business English",
  "EnglishForKids"="English for Kids",
  "EnglishForConversation"="English for Conversation",
}

export enum CourseMaterialType {
  "richText" = 'rich-text',
  "phonetic" = 'phonetic',
}

export interface ICourse {
  tags ?:Array<String> | Array<ITag>,
  coverimage ?: String,
  title:String,
  description:String,
  isPublic: boolean,
  content:String[] | Array<ICourseSection>,
  createdBy:string
}

export interface ICourseSection{
  parent?:string,
  coverimage?:string,
  contentLevel?:String | ICourseContentlevel,
  title:string,
  description:string,
  material:string[] | Array<ICourseMaterial>,
  courseId:string,
  createdBy?:string,
  lastUpdatedBy?:string,
  uuid?:string
}
export interface IStudentLecturerRelationShip {
  student:string,
  lecturer:string,
  course:string
}
export interface IBundle {
  title:string,
  constraints:{
      durationInMonths: number,
      unitCostInFCFAPerMonths:number,
      totalCost:number,
      isActive:boolean,
      percentageDiscount:number,
      numberOfClassHours:number,
  },
  description:string
}

export interface ISubscription{
  _id?: any;
  bundle:any,
  student:any,
  startDate ?:Date,
  endDate ?:Date,
  numberOfClassHoursConsumed:string,
  isActive:boolean,
  isExpired:boolean
}

export interface ITransaction{
  _id?: any;
  student:string,
  description:string,
  currency:string,
  channels:string,
  status:string,
  providerTransactionResponse:string,
  bundle:string,
  callbackLink:string,
  amount:number;
}

export interface ICourseMaterial {
  sectionId:string,
  materialType:CourseMaterialType,
  displayBGColor:string | ICourseMaterialColor,
  title:string,
  sound:string,
  englishText:string,
  description:string,
  content:string
}

export interface ICourseMaterialColor{
  colorCode:string,
  title:string
}
export interface ITag{
  title:string
}
export interface ICourseContentlevel{
  ranking:number,
  title:string
}

export interface IUser {
  accountType: any;
  password: string;
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
  isSuspended?: Boolean,
  registeredCourses?:any,
  EnglishProficiency:EnglishProficiency,
  LearningGoals :LearningGoals
}

export interface IAccountActivity {
  user: string
  isExpired ?:boolean,
  comfirmed ?:boolean,
  activityType  ?: string,
  link ?:string,
  expireAt?:Date
}

export interface INodemailerConfig {
  host: string,
  port: number,
  service:string,
  secure: boolean,
  auth: {
    user: string,
    pass: string
  }
}
export interface INodemailerMessage {from:string, to:string, subject: string,  text?: string,  amp?: string, html?: string}