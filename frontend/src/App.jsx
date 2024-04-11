import "./styles/App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Predict from "components/Predict"
import ModelPlot from "components/ModelPlot"


export default function App() {
    return (
        <div className="App">

            <br />

            <Predict />

            <br />
            <br />
            <br />

            <ModelPlot />
        </div>
    )
}