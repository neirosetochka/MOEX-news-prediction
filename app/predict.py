def preprocess(package: dict, input: list) -> list:
    return input


def predict(package: dict, input: list):
    model = package["model"]

    return model(input)
