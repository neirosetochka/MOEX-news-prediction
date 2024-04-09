import "./styles/App.css"
import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from "react"
import { Button, Row, Form } from 'react-bootstrap'
import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"

export default function App() {

    var [predict, setPredict] = useState(0)

    async function getPredict() {
        var data = await Fetch({ action: `api/predict/`, method: HttpMethod.GET })

        if (data && data.ok) {
            console.log(data)
            setPredict(data.predict)
        }
        setPredict(Math.random())
    }

    return (
        <div className="App">
            <br />
            <h2>Сгенерить предикт на следующий день</h2>
            <br />

            <Form.Control type="date" />

            <br />

            <Button onClick={getPredict}>клик</Button>

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