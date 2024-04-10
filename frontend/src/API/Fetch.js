import { HttpMethod } from "@data/enums"

var headers = {
    "Content-Type": "application/json; charset=utf-8",
    // "X-Requested-With": "XmlHttpRequest",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Headers": "x-requested-with, Content-Type, origin, authorization, accept, x-access-token",
    "Access-Control-Allow-Origin": "*"
    // "Access-Control-Allow-Origin": "no-cors"
}

export default async function Fetch({ action, method, body }) {

    var url = `http://92.255.77.65:80/${action}`
    var data

    console.log(action, method)

    if (method === HttpMethod.GET) {
        data = await fetch(url, {
            mode: "no-cors",
            method: "GET",
            headers: headers
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

        console.log(headers)
        data = await fetch(url, {
            mode: "no-cors",
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : ""
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
