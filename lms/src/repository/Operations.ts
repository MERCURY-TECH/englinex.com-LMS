
/**
* @description Database operations
* @version 1.0
* @since  Saturday, 15 07 2023, at 09:13: 12 
* @author Mercury-Tech by Ngum Buka Fon Nyuydze 
* @email `ngumbukafon@gmail.com`
*/


import { ILogic } from "./IOperations";
import bundleOperations from "./bundle-operations/bundle-operations";
import subscriptionOperations from "./bundle-operations/subscription-operations";
import transactionOperations from "./bundle-operations/transaction-operations";
import classSchedulingOperations from "./class/class-scheduling-operations";
import colors from "./course-operations/colors";
import course from "./course-operations/course";
import courseContentLevelOperations from "./course-operations/course-content-level-operations";
import courseMaterial from "./course-operations/course-material";
import courseSection from "./course-operations/course-section";
import tags from "./course-operations/tags";
import permission_operations from "./permission-operations/permission_operations";
import AccountActivityOperations from "./user-operations/AccountActivity-operations";
import userManagementOperations from "./user-operations/user-management-operations";

/**
 * The logic Interface for a database operation
 */



const Operations:Array<ILogic> = [
    ...userManagementOperations,
    ...permission_operations,
    ...course,
    ...courseSection,
    ...courseMaterial,
    ...courseContentLevelOperations,
    ...tags,
    ...colors,
    ...bundleOperations,
    ...subscriptionOperations,
    ...classSchedulingOperations,
    ...AccountActivityOperations,
    ...transactionOperations
]
export default Operations;