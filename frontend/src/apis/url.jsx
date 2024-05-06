


export const allUrl = {
    singUp: `/user/sign-up`,
    login: `/user/login`,
    getBatches: '/batch',  // /:userId will be added 
    createBatchesUrl: '/batch',
    getStudents: '/user/getStudents',  // /:userId will be added 
    createStudentsUrl: '/student',
    getInterviews: '/user/getInterviews',  // /:userId will be added 
    createInterviewsUrl: '/interview',
    getStudentsOfInterview: '/interview/students', // /:userId/:interviewId
    createScoreAndUpdateResult: '/result/createScoreAndUpdateResult',
    downloadStudentCsv: "/csv/student",
    downloadInterviewCsv: "/csv/interview"
};