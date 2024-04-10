import "./styles/App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { useState } from "react"
import { Row } from "react-bootstrap"
import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"
import PredictForm from "components/PredictForm"

export default function App() {

    var [predict, setPredict] = useState(0)

    async function getPredict(date) {
        var data = await Fetch({ action: "api/v1/predict/", method: HttpMethod.POST })

        if (data && data.ok) {
            // console.log(data)
            // setPredict(data.predict)
        }
        setPredict(Math.random())
    }

    return (
        <div className="App">
            <br />
            <h2 className="text-center">Сгенерить предикт на следующий день</h2>
            <br />

            <PredictForm func={getPredict} />

            <br />
            <br />

            {predict > 0 &&
                <Row className="Row green text-large">
                    {predict}
                </Row>
            }
        </div>
    )
}