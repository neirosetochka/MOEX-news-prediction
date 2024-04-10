import { HttpMethod } from "@data/enums"

var headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}

export default async function Fetch({ action, method, body }) {

    var url = `http://92.255.77.65/${action}` // for server
    // var url = `http://0.0.0.0:8080/${action}` // for local
    var data

    if (method === HttpMethod.GET) {
        data = await fetch(url, {
            method: "GET",
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => console.error(error))

        return data

    } else {
        data = await fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : ""
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            }).catch((error) => console.error(error))

        return data
    }
}
