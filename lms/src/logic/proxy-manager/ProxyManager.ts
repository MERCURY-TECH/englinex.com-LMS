/**
* @description Proxy-vote manager class
* @class ProcurationManager.ts
* @version 1.0
* @since 2023, 06, Friday, 23,14, 57, 53 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


/**
 * 
 * 
 * # Generates proxy Vote
 * 
 * From jhon to peter
 * Peter has to deposit the physical proxy from jhon
 * The Bar admin has to:
 *  - Recieve the the physical proxy
 *  - Register the proxy request to on the application
 *  - The system generates a Proxy OTP valid for 5 minutes and sends it via a local private network network
 *  - 
 * Peter has to comfirm he deposited the proxy assignment, through an OTP comfirmation
 * 
 * John has to recieve a notification about the proxy deposited by
 * 
 * 
 */
export default class ProxyManager{
    /**
     * 
     * @param sessionID 
     * @param assigneeID 
     * @param recepientID 
     * 
     * # Validation Steps
     *  // TODO ::  use phsyics manager to validate physical presence of remitter
     *  // TODO ::  check the session start date 
        // TODO ::  if start date is equal to proxy creation date :: proceed else cancel
        // TODO ::  check that assignee exist in system
        // TODO ::  check that recepient exist in system
        // TODO ::  validate assignee status
        // TODO ::  validate recepeints status
        // TODO ::  Verify that recepients has no other assigned proxyvote for on going session
        // ----------------- Socket Implementation -----------------------
        // TODO ::  assign to recepient and mark its status as innactive
        // TODO ::  notify assignee of attempt of proxy asssignation
        // TODO ::  notify recepient on proxy validation
     * 
     */


    createProxy(sessionID:string, assigneeID:string, recepientID:string ){
 
    }
}