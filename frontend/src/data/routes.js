import Home from "@pages/Home/Home"
import PredictDay from "@pages/PredictDay/PredictDay"
import PredictInterval from "@pages/PredictInterval/PredictInterval"

export var PublicRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/predict_day/",
        element: <PredictDay />
    },
    {
        path: "/predict_interval/",
        element: <PredictInterval />
    },
]
