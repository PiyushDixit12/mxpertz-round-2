

// Response format

export const ResponseFormat = (status,message,data = null,success = true,error = null) => {
    return {status,message,data,success,error};
};