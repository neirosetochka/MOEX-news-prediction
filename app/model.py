from schema import ModelDayInput
from collections import defaultdict
import random
import joblib




class Model:

    def __init__(self):
        self.model = joblib.load("./model_ser/model.pkl")

    def forward(self, data: ModelDayInput):
        return self.model(data)

    def __call__(self, data: ModelDayInput):
        return self.forward(data)

