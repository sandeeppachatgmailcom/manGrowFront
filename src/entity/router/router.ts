export interface userApi_route {
    signUp:string,
    login:string,
    getlogin:string,
    validateOtp:string,
    resetPasswordwithOtp:string,
    saveBasicProfile:string,
    forgotPassword:string,
}

export interface utilsApis_route{
    listAllBatches:string,
    listAllVenues:string,
    listActiveTrainers:string,
    listActiveStudemts:string,
    listActiveEvents:string
}

export interface adminApi_route{
listAllstaffpendingApprovals:string,
approveStaff:string,
createBatch:string,
createEvent:string,
deleteEvent:string
}