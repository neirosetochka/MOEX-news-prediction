import random

from schema import TestInput
from fastapi import APIRouter


api_test = APIRouter(tags=["test"])


@api_test.get("/test_post_date")
def test_post_date(data: TestInput):
    return data


@api_test.post("/test_get_plot")
def test_get_plot() -> dict[str, list[int]]:
    arr_len = 100
    x = [i for i in range(arr_len)]
    y = [random.randrange(1, 100) for _ in range(arr_len)]

    context = {"x": x, "y": y}
    return context
