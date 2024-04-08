import os
import sys
import traceback

import uvicorn
from fastapi import FastAPI, Request, status
from fastapi.logger import logger
from fastapi.encoders import jsonable_encoder
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


from schema import *

app = FastAPI(
    title="ML Model",
    description="Description of the ML Model",
    version="0.0.1",
    terms_of_service=None,
    contact=None,
    license_info=None,
)

app.add_middleware(CORSMiddleware, allow_origins=["*"])
# app.mount("/static", StaticFiles(directory="static/"), name="static") i add nginx to serve static files


@app.post(
    "/api/v1/predict",
    response_model=InferenceResponse,
    responses={422: {"model": ErrorResponse}, 500: {"model": ErrorResponse}},
)
def do_predict(request: Request, body: InferenceInput):
    """
    Perform prediction on input data
    """

    # run model inference
    y = str(body)

    # generate prediction based on probablity

    # round probablities for json

    # prepare json for returning
    return InferenceResponse(
        data=InferenceOutput(
            predicted_value=1,
            predicted_confidence_interval_lower_bound=2,
            predicted_confidence_interval_upper_bound=3,
            text=y,
        )
    )


@app.get("/about")
def show_about():
    """
    Get deployment information, for debugging
    """

    def bash(command):
        output = os.popen(command).read()
        return output

    return {"test"}


if __name__ == "__main__":
    # server api
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
        # log_config="log.ini",
    )
