import joblib
from schema import ModelDayInput
import pandas as pd


class Model:
    def __init__(self):
        self.moex_preprocess = joblib.load("./model_ser/moex_pipeline.plk")

    def forward(self, data: ModelDayInput):
        moex_df = pd.DataFrame(
            {
                "CAPITALIZATION": [data.CAPITALIZATION] * 2,
                "CLOSE": [data.CAPITALIZATION] * 2,
                "DIVISOR": [data.CAPITALIZATION] * 2,
                "HIGH": [data.CAPITALIZATION] * 2,
                "LOW": [data.CAPITALIZATION] * 2,
                "OPEN": [data.CAPITALIZATION] * 2,
                "TRADEDATE": [str(data.TRADEDATE)] * 2,
                "NAME": [None] * 2,
                "SHORTNAME": [None] * 2,
                "SECID": [None] * 2,
                "BOARDID": [None] * 2,
                "DURATION": [None] * 2,
                "YIELD": [None] * 2,
                "DECIMALS": [None] * 2,
                "CURRENCYID": [None] * 2,
                "VOLUME": [None] * 2,
                "TRADINGSESSION": [None] * 2,
                "VALUE": [None] * 2,
            }
        )

        moex_df = self.moex_preprocess.transform(moex_df)

        return moex_df.to_dict()

    def __call__(self, data: ModelDayInput):
        return self.forward(data)
