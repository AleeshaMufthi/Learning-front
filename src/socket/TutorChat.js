// import { useState, useEffect } from "react";
// import { fetchEnrolledUsersAPI, tutorMessageAPI } from "../api/tutor";

// export const TutorChat = (handleError) => {

//     const [students, setStudents] = useState([])
//     const [instMessages, setInstructorMessages] = useState([])
//     const [fetchChange, setFetchChange] = useState(false)

//     useEffect(() => {
//         console.log('hook working')
//         const fetchStudentsEnrolled = async () => {
//             try {

//                 const students = await fetchEnrolledUsersAPI()
                
//                 console.log(students.data.data, 'students details from tutor chattttttttttttttttttt');
                
//                 if (students.error) {
//                     throw new Error(students.error.data.message)
//                 }
//                 const messages = await tutorMessageAPI()
//                 console.log(messages.data.data, "messaaagesssssssssssssss")
//                 setInstructorMessages(messages.data.data)
//                 setStudents(students.data.data)
//             } catch (error) {
//                 console.log(error)
//                 if (
//                     error?.data?.message === "Access token is required" ||
//                     error?.data?.message === "User not found" ||
//                     error?.data?.message === "Invalid token") {
//                     handleError(error?.data?.message);
//                 }
//             }
//         }
//         fetchStudentsEnrolled()
//     }, [handleError, fetchChange])
//     return {students, instMessages, setFetchChange}
// }