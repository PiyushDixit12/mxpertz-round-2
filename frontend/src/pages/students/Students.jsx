import {useCallback,useEffect,useState} from "react"
import {fetchGet} from "../../apis";
import {allUrl} from "../../apis/url";
import {useNavigate} from "react-router-dom";
import {routesConstant} from "../../routes/routesConstant";
import toast from "react-hot-toast";
//import {CreateBatches} from "./CreateBatches";
import ListGroup from 'react-bootstrap/ListGroup';
import {CreateStudent} from "./CreateStudent";

export const Students = () => {
    const [data,setData] = useState("loading");
    const [user,setUser] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        async function fn() {
            if(!localStorage.getItem("user")) {
                localStorage.clear();
                navigate(routesConstant.login.path);
            } else {
                const userData = localStorage.getItem("user");
                const userData2 = JSON.parse(userData);
                setUser(userData2);
                const data = await fetchGet({url: allUrl.getStudents + "/" + userData2._id});
                if(data.success == true) {
                    console.log("students is ",data);
                    setData(data.data);
                } else {
                    toast.error(data.message)
                }
            }

        }
        fn();
    },[navigate]);

    const [show,setShow] = useState(false);

    const handleClose = useCallback(() => setShow(false),[]);
    const handleShow = useCallback(() => setShow(true),[]);

    return (
        <div className=" w-100 h-100">
            {
                data == "loading" ?
                    <div className=" w-100 h-100 d-flex justify-content-center align-items-center">
                        <h1>
                            Please wait while loading
                        </h1>
                    </div>
                    : data.length == 0 ?
                        <div className=" w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                            <h1>
                                No Students Available
                            </h1>
                            <button className=" rounded-3 border-0 p-2 bg-primary text-white" onClick={handleShow} > Create Now </button>
                            {show ? <CreateStudent show={show} id={user._id} handleClose={handleClose} /> : null}
                        </div> :
                        <>
                            <div className=" ms-1 mb-4 d-flex  justify-content-between align-items-center">
                                <h5 > Organization students</h5>
                                <button className=" rounded-3 border-0 p-2 bg-primary text-white" onClick={handleShow} > Create New</button>
                                {show ? <CreateStudent show={show} id={user._id} handleClose={handleClose} /> : null}
                            </div>
                            <ListGroup>
                                <ListGroup.Item><div className=" w-100 row justify-content-between">
                                    <span className="col-3 text-center  fs-5  text-center">Student</span>
                                    <span className="col-3  text-center fs-5 ">Status</span>
                                    <span className="col-3  text-center fs-5 ">college</span>
                                    <span className="col-3  text-center fs-5 ">options</span>
                                </div>
                                </ListGroup.Item >
                                {data.map((value,indx) => {
                                    return (<ListGroup.Item key={indx}><div className=" w-100 row d-flex align-items-center justify-content-between">
                                        <span className=" col-3 text-center  fs-5 ">{value?.name}</span>
                                        <span className=" col-3  text-center fs-5 ">{value?.status}</span>
                                        <span className=" col-3 text-center  fs-5 ">{value?.college}</span>
                                        <button className="col-3 text-center  btn btn-success fs-5 ">edit</button>
                                    </div>
                                    </ListGroup.Item >)
                                })}
                            </ListGroup>
                        </>
            }

        </div >
    )
}
