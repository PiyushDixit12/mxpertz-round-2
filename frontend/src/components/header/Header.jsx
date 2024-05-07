import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {NavLink} from 'react-router-dom';
import {routesConstant} from '../../routes/routesConstant';

export const Header = () => {
    return (
        <>
            <Navbar key={"sm"} expand={"sm"} className=" bg-primary  mb-3">
                <Container >
                    <Navbar.Brand href="/" className=' text-white'>Mxpertz</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${"sm"}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <NavLink to={routesConstant.home.path} className=' text-white-custom fs-6 text-decoration-none me-3'> Batches</NavLink>
                                <NavLink to={routesConstant.students.path} className='text-white-custom fs-6 text-decoration-none me-3'> Students</NavLink>
                                <NavLink to={routesConstant.interviews.path} className='text-white-custom fs-6 text-decoration-none me-3'> Interviews</NavLink>

                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}
