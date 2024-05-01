





export const userApi: userApi_route = {
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

export const adminApis: Record<string,string> = {
    listAllstaffpendingApprovals: '/admin/listpendingStaff',
    approveStaff: '/admin/approveStaff'
};

export const utilityApis: Record<string, string> = {
    listAllBatches: '/utils/listBatches',
    listAllVenues: '/utils/getActiveVenues',
    listActiveTrainers:'/utils/getActiveTrainers'
};
