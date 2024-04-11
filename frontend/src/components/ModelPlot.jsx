import { useEffect, useState } from "react"
import Plot from "react-plotly.js"

import Fetch from "@API/Fetch"
import { HttpMethod } from "@data/enums"


export default function ModelPlot() {
    var [plotArray, setPlotArray] = useState({ x: [], y: [] })

    useEffect(() => {
        Fetch({ action: "api/v1/test_get_plot/", method: HttpMethod.GET })
            .then((response) => {
                if (response && response.x && response.y) {
                    setPlotArray(response)
                }
            })
    }, [])

    return (
        <Plot
            data={[
                {
                    x: plotArray.x,
                    y: plotArray.y,

                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "orange" },
                },
            ]}
            layout={{
                title: "A Fancy Plot",
                responsive: true,
                useResizeHandler: true,
                autosize: true,
                margin: { "l": 0, "r": 0, "b": 0, "t": 0 },
                xaxis: {
                    title: "X",
                    type: "category",
                    zeroline: false,
                    showline: false,
                },
                yaxis: {
                    title: "Y",
                    range: [-10, 100],
                    zeroline: false,
                    showline: false,
                }
            }}
            style={{ width: "100%", height: 600, }}
        />
    )
}