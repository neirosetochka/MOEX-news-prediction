import { HttpMethod } from "@data/enums"

export default async function Fetch({ action, method, body }) {

    var url = `${process.env.REACT_APP_SERVER_URL}${action}`

    if (method === HttpMethod.GET) {
        var data = await fetch(url, {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.ok) {
                    console.error(`Not 2xx response, cause: ${data.error}`)
                }
                return data
            })
            .catch((error) => console.error(error))

        return data

    } else {
        var data = await fetch(url, {
            method: method,
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: body ? JSON.stringify(body) : "",
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.ok) {
                    console.error(`Not 2xx response, cause: ${data.error}`)
                }
                return data
            })
            .catch((error) => console.error(error))

        return data
    }
}
