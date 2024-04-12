import "./styles/App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { PublicRoutes } from "@data/routes"
import Error from "@pages/Error/Error"
import NavBar from "@components/NavBar"


export default function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />

                <br />

                <Routes>
                    {PublicRoutes.map((route) =>
                        <Route
                            key={route.path}
                            path={route.path}
                            errorElement={<Error />}
                            element={route.element}
                            exact
                        />
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    )
}