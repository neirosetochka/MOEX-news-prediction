import random

from schema import TestInput


def test_post_date(data: TestInput):
    return data


def test_get_plot() -> dict[str, list[int]]:
    arr_len = 100
    x = [i for i in range(arr_len)]
    y = [random.randrange(1, 100) for _ in range(arr_len)]

    context = {"x": x, "y": y}
    return context
