import os
import sys
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from tests import api_test
from model import Model
from predict import predict
from config import CONFIG


from schema import ErrorResponse, ModelDayInput, IntervalResponce, IntervalRequest

import pandas as pd


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Initialize FastAPI and add variables
    """
    logger.info(f"Running envirnoment: {CONFIG['ENV']}")

    # Initialize the pytorch model
    model = Model()

    df = pd.read_csv("./model_ser/pred.csv")
    df["date"] = pd.to_datetime(df["date"])
    # add model and other preprocess tools too app state
    app.package = {"model": model, "predict": df}
    yield


app = FastAPI(
    title="ML Model",
    description="Description of the ML Model",
    version="0.0.1",
    terms_of_service=None,
    contact=None,
    license_info=None,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.post(
#     "/api/v1/predict_day",
#     response_model=InferenceResponse,
#     responses={422: {"model": ErrorResponse}, 500: {"model": ErrorResponse}},
# )
# def do_predict_day(request: Request, body: InferenceInput):
#     """
#     Perform prediction on input data
#     """

#     logger.info("API predict called")
#     logger.info(f"input: {body}")

#     # prepare input data
#     X = body

#     # run model inference
#     y = predict(app.package, [X])
#     # generate prediction based on probablity
#     pred = ["setosa", "versicolor", "virginica"][y.index(max(y))]

#     # round probablities for json
#     y = list(map(lambda v: round(v, CONFIG["ROUND_DIGIT"]), y))

#     # prepare json for returning
#     logger.info(f"results: {y}")

#     return InferenceResponse(
#         data=InferenceOutput(
#             predicted_value=y[0],
#             predicted_confidence_interval_lower_bound=y[1],
#             predicted_confidence_interval_upper_bound=y[2],
#             text=pred,
#         )
#     )


@app.get("/api/v1/about")
def show_about():
    """
    Get deployment information, for debugging
    """

    def bash(command):
        output = os.popen(command).read()
        return output

    return {
        "sys.version": sys.version,
        "aaaaa": bash("uname -a"),
    }


################ Test views #################
app.include_router(api_test, prefix="/api/v1", tags=["tests"])
#############################################


@app.post("/api/v1/predict_interval")
def do_predict_interval(data: IntervalRequest):
    df = app.package["predict"]
    filter_df = df[
        df["date"]
        >= pd.to_datetime(data.left) & df["date"]
        <= pd.to_datetime(data.right)
    ]
    length = [i + 1 for i in range(len(filter_df))]

    return IntervalResponce(
        dates=filter_df["date"].tolist(),
        x=length,
        y_pred=filter_df["preds"].tolist(),
        y_true=filter_df["true_y"].tolist(),
    )
    # return {
    #     "data": {
    #         "dates": [
    #             "2020-01-01",
    #             "2020-01-02",
    #             "2020-01-03",
    #             "2020-01-04",
    #             "2020-01-05",
    #             "2020-01-06",
    #         ],
    #         "x": [1, 2, 3, 4, 5, 6],
    #         "y_pred": [
    #             1.8,
    #             2.6
    #         ],
    #         "y_true": [2, 3],
    #     }
    # }


@app.post(
    "/api/v1/predict_day",
    responses={422: {"model": ErrorResponse}, 500: {"model": ErrorResponse}},
)
def do_predict_day(data: ModelDayInput):
    y = predict(app.package, data)
    logger.info("API predict called")
    return {"data": y}


if __name__ == "__main__":
    uvicorn.run(
        "main:app", host="0.0.0.0", port=8080, reload=True, log_config="log.ini"
    )
