
/**
* @description Database operations
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:13: 12 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/

import permission_operations from "./permission-operations/permission_operations";
import userManagementOperations from "./user-operations/user-management-operations";

/**
 * The logic Interface for a database operation
 */
interface ILogic{
    name:string,
    callback:(collection: any) =>any,
    error:(err:any)=>void,
  }


const Operations:Array<ILogic> = [
    ...userManagementOperations,
    ...permission_operations,
]
export default Operations;