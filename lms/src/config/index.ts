/**
* @description  setup file
* @version 1.0
* @since 2023, 06, Saturday, 24,23, 25, 06 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import {dbSettings, serverSettings} from './config'
import DataBase from "./database";
process.env.Token_sercret = "Secret";
export default {dbSettings, serverSettings,db:new DataBase()};