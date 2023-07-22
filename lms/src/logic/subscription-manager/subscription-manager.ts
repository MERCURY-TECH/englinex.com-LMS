

import EventMediator from "../../api/event-service";
import { ISubscription, SubscriptionEvents } from "../lms-interfaces";



/**
* @description Subscription manager class
* @class subscription-manager.ts
* @version 1.0
* @since  Saturday, 22 07 2023, at 18:17: 50 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


export default class SubscriptionManager {
    repository: any;
    static instance:any;
    private subscriptions:any = {};
    private mediator = EventMediator.mediator;
    constructor(repository?:any){
        this.repository = repository;
        if (SubscriptionManager.instance) return SubscriptionManager.instance;
        SubscriptionManager.instance = this;
    }

    public async startWorker(){
        await this.setSubscriptions();
        this.setEvents();
    }

    async setSubscriptions(){
        for (let subscription of (await this.repository.getAllValidSubscriptions())) {
            let studentId =  subscription.student._id
            this.subscriptions[studentId] = {} as any
            this.subscriptions[studentId] = subscription;
        }
    }

    public subscriptionValidator(studentId:string){
        if(this.subscriptions[studentId]){
            let subscription:ISubscription = this.subscriptions[studentId];
            if((new Date(subscription.endDate as Date))>(new Date())) return true;
            this.repository.makeSubscriptionExpired(subscription._id)
        }
        return false
    }

    setEvents(){
        this.mediator.on(SubscriptionEvents.newSubscription,async (data:any)=>await this.setSubscriptions());
        // this.mediator.on(SubscriptionEvents.subscriptionEnded,async (data:any)=>await this.setSubscriptions());
        this.mediator.on(SubscriptionEvents.updateSubscription,async (data:any)=>await this.setSubscriptions());
        this.mediator.on(SubscriptionEvents.validSubscriptionPayment,async (newSubscription:any)=>await this.createSubscription(newSubscription));
    }
    async createSubscription(subscription:ISubscription){
        // respository.createSubscription(subscription)
        console.log('new supscription created');
    }
}