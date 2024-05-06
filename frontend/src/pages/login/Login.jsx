import {NavLink,useNavigate} from "react-router-dom"
import {routesConstant} from "../../routes/routesConstant"
import {useCallback,useState} from "react";
import {allUrl} from "../../apis/url";
import {fetchPost} from "../../apis";
import toast from "react-hot-toast";

export const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        async function fn() {
            const data = await fetchPost({url: allUrl.login,body: {email,password}});
            console.log("login data is ",data);
            if(data?.success == true) {
                toast.success(data?.message);
                localStorage.setItem("user",JSON.stringify(data?.data.user));
                navigate(routesConstant.home.path);
            } else {
                toast.error(data?.message);
            }
        }
        fn();
    },[email,navigate,password]);
    return (
        <div className="form-container-login m-0 d-flex justify-content-center align-items-center">
            <div className="w-100 container-custom">
                <div className="card-custom">
                    <h2>Login</h2>
                    <form className=" d-flex flex-column">
                        <input type="email" className=" rounded-2 mb-2" id="email" defaultValue={email} name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" required />
                        <input type="password" className=" mb-2 rounded-2" id="password" defaultValue={password} name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" required />
                        <button type="button" onClick={handleLogin} className=" rounded-3 border-0 p-2 text-white">Submit</button>

                    </form>
                    <p className=" mt-2 text-center">don&apos;t have an account ? <NavLink to={routesConstant.signUP.path} className={" text-decoration-none"}>sign up</NavLink></p>
                </div>
            </div>
        </div >
    )
}
