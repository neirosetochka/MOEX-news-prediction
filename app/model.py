from schema import ModelDayInput
import joblib


class Model:
    def __init__(self):
        self.model = joblib.load("./model_ser/model.joblib")

    def forward(self, data: ModelDayInput):
        return self.model(data)

    def __call__(self, data: ModelDayInput):
        return self.forward(data)
