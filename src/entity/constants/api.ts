
import  {AdminApi_route} from '../router/adminApi_route'
import  {UtilsApis_route} from '../router/utilsApis_route'
import { UserApi_route } from '../router/userApi_route';
import { TrainerApi_route } from '../router/TrainerApi_route';
 
export const userApi: UserApi_route = {
    signUp: '/auth/create',
    login: '/auth/login',
    getlogin: '/auth/getlogin',
    validateOtp: '/auth/validateOtp',
    resetPasswordwithOtp: '/auth/resetPassword',
    saveBasicProfile: '/auth/saveBasicInfo',
    forgotPassword: '/auth/forgotPassword'
};

export const publicApi: Record<string, string> = {
    getPincode: 'https://api.postalpincode.in/pincode/'
};

export const adminApis: AdminApi_route = {
    listAllstaffpendingApprovals: '/admin/listpendingStaff',
    approveStaff: '/admin/approveStaff',
    createBatch:'/admin/createBatch',
    createEvent:'/admin/createEvents',
    deleteEvent:'/admin/deleteEvent',
    createTask:'/admin/createTask'
    
};

export const utilityApis: UtilsApis_route = {
    listAllBatches: '/utils/listBatches',
    listAllVenues: '/utils/getActiveVenues',
    listActiveTrainers:'/utils/getActiveTrainers',
    listActiveStudemts:'/utils/getActiveTrainers',
    listActiveEvents:'/utils/listActiveEvents',
    listAllTasks:'/utils/listAllTask',
    listAllDesignation:'/utils/getAllDesignation'
    
};

export const trainerApi: TrainerApi_route ={
    getPending:'/trainer/postTrainerPendingEvents',
    saveScheduledTask:'/trainer/postScheduleTask'
}

export const studentApi ={
    getStudentsTask :"/student/postStudentsTask",
    sumbitTask:"/student/submitTask"

}