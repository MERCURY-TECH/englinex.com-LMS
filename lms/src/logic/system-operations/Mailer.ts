/**
* @description Mailer class for sending system emails
* @class Mailer.ts
* @version 1.0
* @since  Saturday, 29 07 2023, at 15:56: 04 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import { INodemailerConfig, INodemailerMessage } from "../lms-interfaces";

const nodemailer = require("nodemailer");


export class Mailer{
    private transporter:any;
    config:any;
    constructor(config:INodemailerConfig){
        this.config =  config;
    }

    async getTransport(){
        this.transporter = await nodemailer.createTransport(this.config)
    }

    async setDestinations(destination:Array<string>){

    }

    async sendMessage(message:INodemailerMessage){
        if(!this.transporter) throw new Error('Please provide a valid transporter');
        return await this.transporter.sendMail(message)  
        
    }
}
