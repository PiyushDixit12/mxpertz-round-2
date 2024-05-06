
import {useCallback,useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {fetchGet,fetchPost} from '../../apis';
import {allUrl} from '../../apis/url';
import {routesConstant} from '../../routes/routesConstant';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Select from 'react-select'

// eslint-disable-next-line react/prop-types
export const CreateInterview = ({show,handleClose,id}) => {

    const [name,setName] = useState("");
    const [date,setDate] = useState("");
    const [students,setStudent] = useState([]);
    const [selectedOption,setSelectedOption] = useState([]);
    console.log(selectedOption);
    const navigate = useNavigate();
    useEffect(() => {
        async function fn() {
            if(!localStorage.getItem("user")) {
                localStorage.clear();
                navigate(routesConstant.login.path);
            } else {

                const data = await fetchGet({url: allUrl.getStudents + "/" + id});
                if(data.success == true) {
                    console.log("students is ",data);
                    let studentData = data?.data?.map(value => {
                        return {value: value?._id,label: value?.name}
                    });
                    setStudent(studentData);
                } else {
                    toast.error(data.message)
                }
            }

        }
        fn();
    },[id,navigate]);


    const createInterview = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        async function fn() {
            const createdFor = selectedOption.map((val) => {
                console.log(val);
                return val?.value;
            });
            console.log("created for",createdFor);
            const data = await fetchPost({url: allUrl.createInterviewsUrl,body: {company: name,date,createdFor,userId: id}});
            console.log("login data is ",data);
            if(data?.success == true) {
                toast.success(data?.message);
                navigate(routesConstant.interviews.path);
                location.reload();

            } else {
                toast.error(data?.message);
            }
        }
        fn();
    },[date,id,name,navigate,selectedOption]);
    return (
        <form>
            <Modal
                show={show}
                onHide={handleClose}
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

                        <input type="text" className=" w-75 rounded-2 mb-2" id="name" defaultValue={name} name="name" onChange={(e) => {setName(e.target.value)}} placeholder="Company Name" required />

                        <input
                            type="date"
                            id="date"
                            name="date"
                            className=" w-75 rounded-2 mb-2"
                            value={date}
                            onChange={(e) => {console.log(e.target.value); setDate(e.target.value)}}
                            required
                        />
                        <Select
                            defaultValue={selectedOption}
                            isMulti
                            name="colors"
                            options={students}
                            className="basic-multi-select w-75 rounded-2 mb-2"
                            classNamePrefix="select"
                            onChange={(selected) => {
                                console.log("100 ",selected)
                                setSelectedOption(selected);
                            }}
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary" onClick={createInterview}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </form>
    )
}
