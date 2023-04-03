import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { Box } from 'react-bootstrap-icons';


function NavbarPrincipal() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <Box />
                        Gestor Inventarios
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/categorias" className="nav-link">Categorias</Link>
                            <Link to="/productos" className="nav-link">Productos</Link>
                            <Link to="/sucursales" className="nav-link">Sucursales</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarPrincipal;