import "./styles/App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { useState } from "react"
import { Row } from "react-bootstrap"
import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"
import PredictForm from "components/PredictForm"

export default function App() {

    var [predict, setPredict] = useState("")

    async function getPredict(date) {
        var body = { 'data': date }
        var response = await Fetch({ action: "api/v1/test/", method: HttpMethod.POST, body: body })
        // var data = await Fetch({ action: "api/v1/test/", method: HttpMethod.GET })

        console.log(response)

        if (response && response.data) {
            setPredict(response.data)
        }
    }

    return (
        <div className="App">
            <br />
            <h2 className="text-center">Сгенерить предикт на следующий день</h2>
            <br />

            <PredictForm func={getPredict} />

            <br />
            <br />

            {predict &&
                <Row className="Row green text-large">
                    {predict}
                </Row>
            }
        </div>
    )
}