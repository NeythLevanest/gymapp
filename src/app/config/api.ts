const URL_ROOT = 'http://localhost:8000/api'
const URL_ROOT_AUTH = 'http://localhost:8000'

const URL_SERVICIOS = {
    usersConfigDetail: URL_ROOT_AUTH+'/users/',
    usersStaff: URL_ROOT_AUTH+'/users/?is_staff=',
    //login : URL_ROOT +'auth/',
    //sign_up: URL_ROOT+'/sign-up/',
    sign_up: URL_ROOT_AUTH+'/sign-up/',
    sign_in: URL_ROOT_AUTH + '/api-token-auth/',
    refreshlogin: URL_ROOT_AUTH +'/api-token-refresh/',
    requestResetPassword: URL_ROOT_AUTH+'/request-reset-email/',
    resetPassword: URL_ROOT_AUTH+'/password-reset-complete/',
    userTypeLogin: URL_ROOT+'/user-type-client/',
    userBasic:URL_ROOT+'/user-basic/',
   

}
export default URL_SERVICIOS