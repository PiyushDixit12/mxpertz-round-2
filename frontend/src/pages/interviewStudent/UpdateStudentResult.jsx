
import {useCallback,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {fetchPost} from '../../apis';
import {allUrl} from '../../apis/url';
import {routesConstant} from '../../routes/routesConstant';
import {useNavigate,useParams} from 'react-router-dom';
import toast from 'react-hot-toast';


// eslint-disable-next-line react/prop-types
export const UpdateStudentResult = () => {

    const [reactJs,setReactJs] = useState();
    const [webDevelopment,setWebDevelopment] = useState();
    const [dsa,setDsa] = useState();
    const {resultId,userId: id,studentId} = useParams();
    const navigate = useNavigate();


    const updateInterviewResult = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        async function fn() {

            const data = await fetchPost({url: allUrl.createScoreAndUpdateResult,body: {dsa,reactJs,webDevelopment,studentId,resultId,userId: id}});
            console.log("login data is ",data);
            if(data?.success == true) {
                toast.success(data?.message);
                navigate(routesConstant.interviews.path);

            } else {
                toast.error(data?.message);
            }
        }
        fn();
    },[dsa,id,navigate,reactJs,resultId,studentId,webDevelopment]);
    return (
        <form>
            <Modal
                show={true}
                onHide={() => {navigate(routesConstant.interviews.path);}}
                backdrop="static"
                size='lg'
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create  Interview</Modal.Title>
                </Modal.Header>
                <Modal.Body className=' w-100'>
                    <div className=" w-100 d-flex flex-column justify-content-center align-items-center">

                        <input
                            type="number"
                            className="w-75 rounded-2 mb-2"
                            id="webDevelopment"
                            defaultValue={webDevelopment}
                            name="webDevelopment"
                            onChange={(e) => {
                                if(e.target.value <= 100) {
                                    setWebDevelopment(e.target.value);
                                } else {
                                    e.target.value = 100;
                                    setWebDevelopment(100);
                                }
                            }}
                            placeholder="Web Development Marks"
                            required
                        />

                        <input
                            type="number"
                            className="w-75 rounded-2 mb-2"
                            id="dsa"
                            defaultValue={dsa}
                            name="dsa"
                            onChange={(e) => {
                                if(e.target.value <= 100) {
                                    setDsa(e.target.value);
                                } else {
                                    e.target.value = 100;
                                    setDsa(100);
                                }
                            }}
                            placeholder="DSA Marks"
                            required
                        />

                        <input
                            type="number"
                            className="w-75 rounded-2 mb-2"
                            id="reactJs"
                            defaultValue={reactJs}
                            name="reactJs"
                            onChange={(e) => {
                                if(e.target.value <= 100) {
                                    setReactJs(e.target.value);
                                } else {
                                    e.target.value = 100;
                                    setReactJs(100);
                                }
                            }}
                            placeholder="React Js Marks"
                            required
                        />


                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {navigate(routesConstant.interviews.path)}}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary" onClick={updateInterviewResult}>Update Result</Button>
                </Modal.Footer>
            </Modal>
        </form>
    )
}
