import {Navigate,Route,Routes} from "react-router-dom"
// import {Private} from "../components/private/Private";
import {routesConstant} from "./routesConstant";
import {Login} from "../pages/login/Login";
import {SignUp} from "../pages/signup/SignUp";
import {Toaster} from 'react-hot-toast'
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
                <Route path={routesConstant.home.path} element={<>home</>} />

                <Route path="*" element={<>{<Navigate to={"/login"} />}</>} />
            </Routes>

        </div>
    )
}
