import "@components/styles/NavBar.css"
import img from "@images/yandex-logo.jpg"

import { Link } from "react-router-dom"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"


export default function NavBar() {
    return (
        <>
            {
                [false].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                        <Container fluid>
                            <Navbar.Brand as={Link} to="/">
                                <img id="home-icon" src={img} />
                                Команда А
                            </Navbar.Brand>

                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        предсказания
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link as={Link} to="/predict_day/">на сегодня</Nav.Link>
                                        <Nav.Link as={Link} to="/predict_interval/">на интервал</Nav.Link>
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                ))
            }
        </>
    );
}
