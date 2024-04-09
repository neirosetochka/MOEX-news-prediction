import os
import sys

import uvicorn
from fastapi import FastAPI, Request
from fastapi.logger import logger
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from model import Model
from predict import predict
from config import CONFIG
from exception_handler import validation_exception_handler, python_exception_handler
from schema import InferenceResponse, InferenceInput, InferenceOutput, ErrorResponse

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
)

# TODO change
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO add frontend and nginx


app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, python_exception_handler)


@app.on_event("startup")
async def startup_event():
    """
    Initialize FastAPI and add variables
    """

    logger.info("Running envirnoment: {}".format(CONFIG["ENV"]))

    # Initialize the pytorch model
    model = Model()

    # add model and other preprocess tools too app state
    app.package = {"model": model}


@app.post(
    "/api/v1/predict",
    response_model=InferenceResponse,
    responses={422: {"model": ErrorResponse}, 500: {"model": ErrorResponse}},
)
def do_predict(request: Request, body: InferenceInput):
    """
    Perform prediction on input data
    """

    logger.info("API predict called")
    logger.info(f"input: {body}")

    # prepare input data
    X = body

    # run model inference
    y = predict(app.package, [X])
    # generate prediction based on probablity
    pred = ["setosa", "versicolor", "virginica"][y.index(max(y))]

    # round probablities for json
    y = list(map(lambda v: round(v, CONFIG["ROUND_DIGIT"]), y))

    # prepare json for returning

    logger.info(f"results: {y}")

    return InferenceResponse(
        data=InferenceOutput(
            predicted_value=y[0],
            predicted_confidence_interval_lower_bound=y[1],
            predicted_confidence_interval_upper_bound=y[2],
            text=pred,
        )
    )


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


@app.post(
    "/api/v1/test",
)
def test(data: dict):
    return data


if __name__ == "__main__":
    uvicorn.run(
        "main:app", host="0.0.0.0", port=8080, reload=True, log_config="log.ini"
    )
