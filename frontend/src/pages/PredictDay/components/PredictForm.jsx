import { useEffect, useState } from "react"
import { Button, Col, Row, Form, FloatingLabel } from "react-bootstrap"


export default function PredictForm({ getPredict, error, setError, success, setSuccess }) {

    var [buttonColor, setButtonColor] = useState("secondary")
    var [form, setForm] = useState({
        // Necessary:
        CAPITALIZATION: undefined,
        CLOSE: undefined,
        DIVISOR: undefined,
        HIGH: undefined,
        LOW: undefined,
        OPEN: undefined,
        TRADEDATE: undefined,
        finance: undefined,
        economic: undefined,
        politic: undefined,

        // Optional:
        NAME: "",
        SHORTNAME: "",
        SECID: "",
        BOARDID: "",
        DURATION: "",
        YIELD: "",
        DECIMALS: "",
        CURRENCYID: "",
        VOLUME: "",
        TRADINGSESSION: "",
        VALUE: "",
    })

    async function callFunc(event) {
        await event.preventDefault()
        if (form.CAPITALIZATION && form.CLOSE && form.DIVISOR && form.HIGH && form.LOW && form.OPEN && form.TRADEDATE && form.finance && form.economic && form.politic) {
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
            <Row className="g-3">
                <Col md>
                    <FloatingLabel label="CAPITALIZATION" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="CAPITALIZATION"
                            onChange={e => setForm({ ...form, CAPITALIZATION: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="OPEN" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="OPEN"
                            onChange={e => setForm({ ...form, OPEN: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="CLOSE" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="CLOSE"
                            onChange={e => setForm({ ...form, CLOSE: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-2">
                <Col md>
                    <FloatingLabel label="HIGH" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="HIGH"
                            onChange={e => setForm({ ...form, HIGH: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="LOW" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="LOW"
                            onChange={e => setForm({ ...form, LOW: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-2">
                <Col md>
                    <FloatingLabel label="DIVISOR" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="DIVISOR"
                            onChange={e => setForm({ ...form, DIVISOR: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="TRADEDATE" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="date"
                            onChange={e => setForm({ ...form, TRADEDATE: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-3">
                <Col md>
                    <FloatingLabel label="finance" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="finance"
                            onChange={e => setForm({ ...form, finance: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="economic" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="economic"
                            onChange={e => setForm({ ...form, economic: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="politic" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="politic"
                            onChange={e => setForm({ ...form, politic: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <h5>Необязательно:</h5>

            <Row className="g-2">
                <Col md>
                    <FloatingLabel label="NAME" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="NAME"
                            onChange={e => setForm({ ...form, NAME: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="SHORTNAME" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="SHORTNAME"
                            onChange={e => setForm({ ...form, SHORTNAME: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-4">
                <Col md>
                    <FloatingLabel label="SECID" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="SECID"
                            onChange={e => setForm({ ...form, SECID: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>

                <Col md>
                    <FloatingLabel label="BOARDID" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="BOARDID"
                            onChange={e => setForm({ ...form, BOARDID: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="DURATION" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="DURATION"
                            onChange={e => setForm({ ...form, DURATION: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="YIELD" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="YIELD"
                            onChange={e => setForm({ ...form, YIELD: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-3">
                <Col md>
                    <FloatingLabel label="DECIMALS" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="DECIMALS"
                            onChange={e => setForm({ ...form, DECIMALS: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="CURRENCYID" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="CURRENCYID"
                            onChange={e => setForm({ ...form, CURRENCYID: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="VOLUME" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="VOLUME"
                            onChange={e => setForm({ ...form, VOLUME: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-3">
                <Col md>
                    <FloatingLabel label="TRADINGSESSION" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="TRADINGSESSION"
                            onChange={e => setForm({ ...form, TRADINGSESSION: e.target.value })}
                        />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="VALUE" controlId="floatingInput" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="VALUE"
                            onChange={e => setForm({ ...form, VALUE: e.target.value })}
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