import Swal from 'sweetalert2';

async function actionWrapper(callback, message, onErrorFunction) {
    try {
        let result =  await callback()
        if(result) return { success: true, message: message ? message : 'action was successful', result }
        return { success: true, message: message ? message : 'action was successful',result:null }
    } catch (e) {
        onErrorFunction ? await onErrorFunction() : ''
        if (e.response != undefined) return { success: false, message: e.response.data.errorMessage }
        return { success: false, message: 'Could not connect to platform because of ' + e.message }
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
}

async function actionNotificationWrapper(statusObj,callback = ()=>true, postCallback= ()=>{}){
    if(await callback()){
        if (statusObj.success) {
            Swal.fire(statusObj.message);
            Swal.update({ icon: "success" });
          } else {
            Swal.fire(statusObj.message);
            Swal.update({ icon: "error" });
          }
    }
    await postCallback()

}
async function actionNotificationWrapperWithComfirmationModal(callback = ()=>{},modalConfig={},){
    let modalValue = await new Swal({
        title: modalConfig.title ? modalConfig.title : "Modal alert title",
        text: modalConfig.text ? modalConfig.text :"Modal alert description",
        icon: modalConfig.icon ? modalConfig.icon :"warning",
        showCancelButton: true,
        confirmButtonColor: "#490194",
        confirmButtonText: modalConfig.btnText ? modalConfig.btnText :"Yes, Delete it!",
      });
      if(modalValue.value){
          actionNotificationWrapper(await callback(),()=>modalValue.value )
      }
}

export { parseJwt,actionWrapper,actionNotificationWrapper,actionNotificationWrapperWithComfirmationModal }