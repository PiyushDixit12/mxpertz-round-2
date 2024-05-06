import {useEffect,useState} from "react"
import {fetchGet} from "../../apis";
import {allUrl} from "../../apis/url";
import {useNavigate,useParams} from "react-router-dom";
import {routesConstant} from "../../routes/routesConstant";
import toast from "react-hot-toast";
//import {CreateBatches} from "./CreateBatches";
import ListGroup from 'react-bootstrap/ListGroup';
// import {CreateStudent} from "./CreateStudent";

export const InterviewStudent = () => {
    const [data,setData] = useState("loading");
    const params = useParams();
    console.log(params)
    const navigate = useNavigate();
    useEffect(() => {
        async function fn() {
            if(!localStorage.getItem("user")) {
                localStorage.clear();
                navigate(routesConstant.login.path);
            } else {

                const data = await fetchGet({url: allUrl.getStudentsOfInterview + "/" + params.interviewId});
                if(data.success == true) {
                    console.log("students is ",data);
                    setData(data.data);
                } else {
                    toast.error(data.message)
                }
            }

        }
        fn();
    },[navigate,params.interviewId]);


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
                        </div> :
                        <>
                            <div className=" ms-1 mb-4 d-flex  justify-content-between align-items-center">
                                <h5 > Interview students</h5>
                            </div>
                            <ListGroup>
                                <ListGroup.Item><div className=" w-100 row justify-content-between">
                                    <span className="col-3 text-center  fs-5  text-center">Student</span>
                                    <span className="col-2  text-center fs-5 ">Status</span>
                                    <span className="col-3  text-center fs-5 ">college</span>
                                    <span className="col-2  text-center fs-5 ">Result</span>
                                    <span className="col-2  text-center fs-5 ">options</span>
                                </div>
                                </ListGroup.Item >
                                {data.map((value,indx) => {
                                    console.log("index is ",indx," value  ",value)
                                    return (<ListGroup.Item key={indx}><div className=" w-100 row d-flex align-items-center justify-content-between">
                                        <span className=" col-3 text-center  fs-5 ">{value?.name}</span>
                                        <span className=" col-2  text-center fs-5 ">{value?.status}</span>
                                        <span className=" col-3 text-center  fs-5 ">{value?.college}</span>
                                        <span className=" col-2 text-center  fs-5 ">{value?.result}</span>
                                        <button className="col-2 text-center  btn btn-success fs-5 " disabled={value.result == 'PASS'} onClick={() => {navigate(`${routesConstant.updateInterviewResult.path}/${value.resultId}/${value.userId}/${value._id}`)}}>edit</button>


                                    </div>
                                    </ListGroup.Item >)
                                })}
                            </ListGroup>
                        </>
            }

        </div >
    )
}
