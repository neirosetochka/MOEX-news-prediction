import { useState } from "react"
import { Row } from "react-bootstrap"
import Plot from "react-plotly.js"

import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"
import PredictForm from "@pages/PredictInterval/components/PredictForm"


export default function PredictInterval() {

    var [error, setError] = useState("")
    var [success, setSuccess] = useState(false)

    var [predict, setPredict] = useState({
        dates: [],
        x: [],
        y_pred: [],
        y_true: []
    })

    async function getPredict(date) {
        var body = { date: date }
        var response = await Fetch({ action: "api/v1/predict_interval/", method: HttpMethod.POST, body: body })

        if (response && response.data) {
            setError("")
            setSuccess(true)
            setPredict(response.data)
        } else {
            setSuccess(false)
            setError("Ошибка")
            setPredict({
                dates: [],
                x: [],
                y_pred: [],
                y_true: []
            })
        }
    }

    return (
        <div className="PredictInterval">
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

            <br />

            {predict.x.length > 0
                &&

                <Plot
                    data={[
                        {
                            x: predict.dates,
                            // x: ["2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06"],
                            y: predict.y_true,

                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "blue" },
                            name: "истинные",
                        },
                        {
                            x: predict.dates,
                            // x: ["2020-01-01", "2020-01-02", "2020-01-03"],
                            y: predict.y_pred,

                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "orange" },
                            name: "предсказанные",
                        },
                    ]}
                    layout={{
                        title: `предсказания с ${predict.dates[0]} по ${predict.dates[predict.dates.length - 1]}`,
                        responsive: true,
                        useResizeHandler: true,
                        autosize: true,
                        // margin: { "l": 0, "r": 0, "b": 0, "t": 0 },
                        xaxis: {
                            title: "дата",
                            type: "category",
                            zeroline: false,
                            showline: false,
                        },
                        yaxis: {
                            title: "стоимость",
                            zeroline: false,
                            showline: false,
                            // range: [-10, 100],
                        },
                    }}
                    style={{ width: "100%", height: 600 }}
                />
            }
        </div>
    )
}