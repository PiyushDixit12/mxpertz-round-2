import {NavLink,useNavigate} from "react-router-dom"
import {routesConstant} from "../../routes/routesConstant"
import {fetchPost} from "../../apis"
import {allUrl} from "../../apis/url"
import {useCallback,useState} from "react"
import toast from "react-hot-toast"

export const SignUp = () => {

    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        async function fn() {
            const data = await fetchPost({url: allUrl.singUp,body: {email,password,name}});
            console.log("Sign up data is ",data);

            if(data?.success == true) {
                toast.success(data?.message);
                localStorage.setItem("user",JSON.stringify(data?.data));

                navigate(routesConstant.home.path);
            } else {
                toast.error(data?.message);
            }
        }
        fn();
    },[email,name,navigate,password]);
    return (
        <div className="form-container-login m-0 d-flex justify-content-center align-items-center">
            <div className="w-100 container-custom">
                <div className="card-custom">
                    <h2>Register</h2>
                    <form className=" d-flex flex-column" >
                        <input type="text" className=" rounded-2 mb-2" id="username" defaultValue={name} name="username" onChange={(e) => {setName(e.target.value)}} placeholder="Username" required />

                        <input type="email" className=" rounded-2 mb-2" id="email" defaultValue={email} name="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" required />
                        <input type="password" className=" mb-2 rounded-2" id="password" defaultValue={password} name="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" required />
                        <button type="button" onClick={handleSignUp} className=" rounded-3 border-0 p-2 text-white">Submit</button>
                    </form>
                    <p className=" mt-2 text-center">all ready have an account ? <NavLink to={routesConstant.login.path} className={" text-decoration-none"}>login</NavLink></p>
                </div>
            </div>
        </div >
    )
}
