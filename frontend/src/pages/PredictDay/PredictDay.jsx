import { useState } from "react"
import { Row } from "react-bootstrap"

import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"
import PredictForm from "@pages/PredictDay/components/PredictForm"


export default function PredictDay() {

    var [error, setError] = useState("")
    var [success, setSuccess] = useState(false)
    var [predict, setPredict] = useState(undefined)

    async function getPredict(date) {
        var body = { date: date }
        var response = await Fetch({ action: "api/v1/predict_day/", method: HttpMethod.POST, body: body })

        // TODO: remove
        response = { data: 10 }

        if (response && response.data) {
            setError("")
            setSuccess(true)
            setPredict(response.data)
        } else {
            setSuccess(false)
            setError("Ошибка")
            setPredict(undefined)
        }
    }

    return (
        <div className="PredictDay">
            <br />

            <PredictForm
                getPredict={getPredict}
                error={error}
                setError={setError}
                success={success}
                setSuccess={setSuccess} />

            <br />

            {error &&
                <Row className="Row text-large text-red">
                    {error}
                </Row>
            }

            {predict !== undefined
                &&
                <h3 className="text-center">{predict}</h3>
            }

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}