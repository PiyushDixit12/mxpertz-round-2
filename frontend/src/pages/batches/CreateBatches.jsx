
import {useCallback,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {fetchPost} from '../../apis';
import {allUrl} from '../../apis/url';
import {routesConstant} from '../../routes/routesConstant';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
export const CreateBatches = ({show,handleClose,id}) => {
    const [name,setName] = useState("");
    const navigate = useNavigate();
    const createBatch = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        async function fn() {
            const data = await fetchPost({url: allUrl.createBatchesUrl,body: {name,userId: id}});
            console.log("login data is ",data);
            if(data?.success == true) {
                toast.success(data?.message);
                location.reload();

                navigate(routesConstant.home.path);
            } else {
                toast.error(data?.message);
            }
        }
        fn();
    },[id,name,navigate]);
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
                    <Modal.Title>Create Batch For Students</Modal.Title>
                </Modal.Header>
                <Modal.Body className=' w-100'>
                    <div className=" w-100 d-flex justify-content-center align-items-center">

                        <input type="text" className=" w-75 rounded-2 mb-2" id="username" defaultValue={name} name="username" onChange={(e) => {setName(e.target.value)}} placeholder="Batch Name" required />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='button' variant="primary" onClick={createBatch}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </form>
    )
}
