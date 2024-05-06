
import {useCallback,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {fetchPost} from '../../apis';
import {allUrl} from '../../apis/url';
import {routesConstant} from '../../routes/routesConstant';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
export const CreateStudent = ({show,handleClose,id}) => {
    const [name,setName] = useState("");
    const [college,setCollege] = useState("");
    const [status,setStatus] = useState("placed");

    const navigate = useNavigate();
    const createStudent = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        async function fn() {
            const data = await fetchPost({url: allUrl.createStudentsUrl,body: {name,college,status,userId: id}});
            console.log("login data is ",data);
            if(data?.success == true) {
                toast.success(data?.message);

                navigate(routesConstant.students.path);
                location.reload();
            } else {
                toast.error(data?.message);
            }
            handleClose();
        }
        fn();
    },[college,handleClose,id,name,navigate,status]);
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
                    <Modal.Title>Create  Student</Modal.Title>
                </Modal.Header>
                <Modal.Body className=' w-100'>
                    <div className=" w-100 d-flex flex-column justify-content-center align-items-center">

                        <input type="text" className=" w-75 rounded-2 mb-2" id="name" defaultValue={name} name="name" onChange={(e) => {setName(e.target.value)}} placeholder="Student Name" required />

                        <input type="text" className=" w-75 rounded-2 mb-2" id="college" defaultValue={college} name="college" onChange={(e) => {setCollege(e.target.value)}} placeholder="College Name" required />

                        <select name="status" className=" w-75 rounded-2 mb-2" defaultValue={status} id="status" onChange={(e) => {setStatus(e.target.value)}} required>
                            <option value="placed" defaultChecked> Placed</option>
                            <option value="not_placed"> Not Placed</option>
                        </select>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary" onClick={createStudent}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </form>
    )
}
