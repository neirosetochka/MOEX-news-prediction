import "@components/styles/NavBar.css"
import yandex_logo from "@images/yandex-logo.jpg"
import github_logo from "@images/github-logo.png"

import { Link } from "react-router-dom"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"


export default function NavBar() {

    var expand = false

    return (
        <>
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img id="home-icon" src={yandex_logo} />
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
                            <a href="https://github.com/lm-cyber/project_22_STUDCAMP" target="_blank">
                                <img id="home-icon" src={github_logo} />
                            </a>
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
        </>
    )
}
