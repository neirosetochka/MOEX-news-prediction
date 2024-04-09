import { useState } from "react"
import { Button, Row, Form, InputGroup } from 'react-bootstrap'
import { HttpMethod } from "@data/enums"
import Fetch from "@API/Fetch"

export default function PredictForm({ func }) {

    var [date, setDate] = useState(undefined)


    return (

        <>
            <Form onSubmit={(e) => func(e)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="date"
                            onChange={e => setDate(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-addon1"
                            type="submit"
                        >
                            get predict
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </>

    )
}