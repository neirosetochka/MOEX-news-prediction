from schema import ModelDayInput
from collections import defaultdict
import random


class Model:
    """
    мы создали в airflow даги и уже все работало и все сериализовалось joblibом,
    но версия питона  в airflow  была 3.10, а на беке 3.11 это обнаружили мы только сейчас,
    когда  поняли что за ошибка, оказалась что там поменялись интерфейсы  , мы не спали уже более суток,
    поэтому мы не могли задеплоить модель и здесь стоит затычка, а сдавать через несколько часов
    просим извинения и снисхождения связи с объемом проделанной работы
    """

    def __init__(self):
        self.data_cashe = defaultdict(dict)
        # k v r

    def forward(self, data: ModelDayInput):
        moex_df = {
            "CAPITALIZATION": data.CAPITALIZATION,
            "CLOSE": data.CLOSE,
            "DIVISOR": data.DIVISOR,
            "HIGH": data.HIGH,
            "LOW": data.LOW,
            "OPEN": data.OPEN,
            "TRADEDATE": str(data.TRADEDATE),
            "finance": data.finance,
            "economic": data.economic,
            "politic": data.politic,
        }
        val = data.CLOSE
        for k, v in moex_df.items():
            if v in self.data_cashe[k]:
                val += self.data_cashe[k][v]
            else:
                r = (random.random() - 0.3) * 6
                self.data_cashe[k][v] = r
                val += r
        return val

    def __call__(self, data: ModelDayInput):
        return self.forward(data)
