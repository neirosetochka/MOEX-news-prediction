import { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"

export default function PredictForm({ func }) {

    var [date, setDate] = useState(undefined)

    async function callFunc(event) {
        await event.preventDefault()
        var date_obj = Date.parse(date)
        return await func(date_obj)
    }

    return (
        <>
            <Form formAction="POST" onSubmit={e => callFunc(e)}>
                <Form.Group className="mb-3">
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