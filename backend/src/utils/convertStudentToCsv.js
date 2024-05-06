// Function to convert student data to CSV format
export function convertStudentToCSV(students) {
    // Assuming you have logic to convert student data to CSV format
    // Example:
    let csvData = "_id,name,college,status\n";
    students.forEach(student => {

        csvData += `${student._id},${student.name},${student.college},${student.status}\n`;
    });
    return csvData;
}


// Function to convert student data to CSV format
export function convertInterviewToCSV(interviews) {
    // Assuming you have logic to convert student data to CSV format
    // Example:
    let csvData = "_id,name,college,status,userId,companyId,company name ,date,result\n";
    interviews.forEach(interview => {

        csvData += `${interview._id},${interview.name},${interview.college},${interview.status},${interview.userId},${interview.companyId},${interview.company},${interview.date},${interview.result}\n`;
    });
    return csvData;
}