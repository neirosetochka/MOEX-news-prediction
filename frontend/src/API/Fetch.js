import { HttpMethod } from "@data/enums"


var headers = {
    "Content-Type": "application/json; charset=utf-8",
    // "Access-Control-Allow-Origin": "no-cors"
    "Access-Control-Allow-Origin": "*"
}



export default async function Fetch({ action, method, body }) {

    // var url = `${process.env.REACT_APP_SERVER_URL}${action}`

    var url = `http://92.255.77.65:80/${action}`
    // url = `http://92.255.77.65/${action}`
    var data

    console.log(action, method)

    if (method === HttpMethod.GET) {
        data = await fetch(url, {
            method: "GET",
            credentials: "same-origin",
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
            method: method,
            credentials: "same-origin",
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
