import {Navigate,Route,Routes} from "react-router-dom"
// import {Private} from "../components/private/Private";
import {routesConstant} from "./routesConstant";
import {Login} from "../pages/login/Login";
import {SignUp} from "../pages/signup/SignUp";
import {Toaster} from 'react-hot-toast'
import {Layout} from "../components/layout/Layout";
import {Batches} from "../pages/batches/Batches";
import {Students} from "../pages/students/Students";
import {Interviews} from "../pages/interview/Interviews";
import {InterviewStudent} from "../pages/interviewStudent/InterviewStudent";
import {UpdateStudentResult} from "../pages/interviewStudent/UpdateStudentResult";
export const AppRoutes = () => {

    return (
        <div className=" w-100 h-100">
            <Toaster />
            <Routes>

                {/* <Route path="/" element={<Private />} >
                    <Route path={routesConstant.home.path} element={<>home</>} />

                </Route> */}
                <Route path={routesConstant.login.path} element={<><Login /></>} />
                <Route path={routesConstant.signUP.path} element={<><SignUp /></>} />
                <Route path={routesConstant.home.path} element={<><Layout><Batches /></Layout></>} />
                <Route path={routesConstant.students.path} element={<><Layout><Students /></Layout></>} />
                <Route path={routesConstant.interviews.path} element={<><Layout><Interviews /></Layout></>} />
                <Route path={routesConstant.interviewsById.path + "/:interviewId"} element={<><Layout><InterviewStudent /></Layout></>} />
                <Route path={routesConstant.updateInterviewResult.path + "/:resultId/:userId/:studentId"} element={<><Layout><UpdateStudentResult /></Layout></>} />


                <Route path="*" element={<>{<Navigate to={"/login"} />}</>} />
            </Routes>

        </div>
    )
}
