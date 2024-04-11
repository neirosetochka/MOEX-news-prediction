import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"


export default function PredictForm({ getPredict, error, setError, success, setSuccess }) {

    var [dateInterval, setDateInterval] = useState({ start: "", end: "" })
    var [buttonColor, setButtonColor] = useState("secondary")

    async function callFunc(event) {
        await event.preventDefault()
        if (dateInterval.start && dateInterval.end) {
            setError("")
            return await getPredict(dateInterval)
        } else {
            setError("введите дату")
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
            <Form.Group className="mb-3">
                <Form.Label>начальная дата</Form.Label>
                <Form.Control
                    type="date"
                    onChange={e => setDateInterval({ ...dateInterval, start: e.target.value })}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>конечная дата</Form.Label>
                <Form.Control
                    type="date"
                    onChange={e => setDateInterval({ ...dateInterval, end: e.target.value })}
                />
            </Form.Group>

            <div className="d-grid gap-2">
                <Button variant={buttonColor} type="submit">
                    предсказать
                </Button>
            </div>
        </Form>
    )
}