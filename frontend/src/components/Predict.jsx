import { useState } from "react"
import { Row } from "react-bootstrap"

import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"
import PredictForm from "./PredictForm"


export default function Predict() {

    var [predict, setPredict] = useState("")
    var [error, setError] = useState("")

    async function getPredict(date) {
        var body = { "date": date }
        var response = await Fetch({ action: "api/v1/test_post_date/", method: HttpMethod.POST, body: body })

        if (response && response.date) {
            setError("")
            setPredict(response.date)
        }
    }

    return (
        <>
            <h2 className="text-center">Сгенерить предикт на следующий день</h2>
            <br />

            <PredictForm getPredict={getPredict} setPredict={setPredict} setError={setError} />

            <br />
            <br />

            {predict &&
                <Row className="Row green text-large">
                    {predict}
                </Row>
            }

            {error &&
                <Row className="Row red text-large">
                    {error}
                </Row>
            }
        </>
    )

}