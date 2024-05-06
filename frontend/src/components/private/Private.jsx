import {useEffect,useState} from "react";
import {Outlet,useNavigate} from "react-router-dom";
import {routesConstant} from "../../routes/routesConstant";


export const Private = () => {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem("user");
        console.log("user Data is",userData);
        if(userData) {
            setUser(JSON.parse(userData));
            navigate(routesConstant.home.path);
        } else {
            navigate(routesConstant.login.path);
        }
    },[navigate,user]);
    return (
        <><Outlet /></>
    )
}
