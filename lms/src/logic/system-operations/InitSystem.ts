/**
* @description InitSystem that runs all server initializations
* @class InitSystem.ts
* @version 1.0
* @since  Sunday, 16 07 2023, at 21:17: 52 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

export default class InitSystem{
    static async initializeRootUser(operations:any, rootUserRecord?:any){
        try {
            console.log()
            let rootUser = await operations.findUserByField({username:'root'});
            if(!rootUser){
                let createdRootUser  = (await operations.registerUsers([{
                    accountType: 'admin',
                    firstname:process.env.ROOT_FIRST_NAME || "root",
                    lastname:process.env.ROOT_LAST_NAME || "root",
                    email:process.env.ROOT_USER_NAME || "root",
                    telephone:process.env.ROOT_PHONE_NUMBER || "root",
                    password:process.env.ROOT_ROOT_PASSWORD || "root",
                    isActive:true,
                    isSuspended:false,
                    isRoot:true,
                }]))[0];
                let rootRole = await operations.getRoleBySID('root');
                await operations.assignRoleToUser({userID:createdRootUser._id, Role:rootRole._id})
            }
        } catch (error) {
            
        }
    }
}