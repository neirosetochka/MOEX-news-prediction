import { useEffect, useState } from "react"
import { Button, Col, Row, Form, FloatingLabel } from "react-bootstrap"


export default function PredictForm({ getPredict, error, setError, success, setSuccess }) {

    var [buttonColor, setButtonColor] = useState("secondary")
    var [form, setForm] = useState({ left: "", right: "" })

    async function callFunc(event) {
        await event.preventDefault()
        if (form.left && form.right) {
            setError("")
            return await getPredict(form)
        } else {
            setError("заполните форму")
        }
        setSuccess(false)
    }

    useEffect(() => {
        var buttonNewColor = ""

        if (error === "" && success === false) {
            buttonNewColor = "secondary"
        } else if (error !== "") {
            buttonNewColor = "danger"
        } else if (success === true) {
            buttonNewColor = "success"
        }
        setButtonColor(buttonNewColor)

    }, [error, success])

    return (
        <Form formAction="POST" onSubmit={e => callFunc(e)}>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel label="начальная дата" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="date"
                            onChange={e => setForm({ ...form, left: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="конечная дата" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="date"
                            onChange={e => setForm({ ...form, right: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <div className="d-grid gap-2">
                <Button variant={buttonColor} type="submit">
                    предсказать
                </Button>
            </div>
        </Form>
    )
}