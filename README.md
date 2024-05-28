# Прогнозирование цены закрытия индекса МосБиржи
Наша модель прогнозирует цену закрытия индекса Мосбиржи на сегодня, основываясь на данных, известных при открытии биржи и статей с новостных источников. Это может быть полезно проп-трейдерам/equity-тредерам:
* Так как динамика индекса МосБиржи показывает динамику всего Российского фондового рынка, на основании поведения индекса можно сделать предположение о поведении акций - основных компонентов индекса (Лукойл/Газпром/Сбер и т. д.).
* Есть фонды, составы портфелей которых реплицируют индекс мосбиржи (практически 1:1), соответственно, зная утром, где будет цена, вечером можно открывать короткие/длинные позиции для заработка на изменении значения индекса.
Для бейзлайна и грамотного составления признакового пространства сначала анализировался сам временной ряд.
<p align="center">
<img src="https://github.com/neirosetochka/MOEX-news-prediction/assets/72963340/0ad145a6-3c18-4947-a88c-f1ed91dfdb63" width=90%> 
</p>
Затем строилась модель Тейла-Вейджа, которая затем использовалась для оценки качества прогнозирования.
<p float="left">
<img src="https://github.com/neirosetochka/MOEX-news-prediction/assets/72963340/6a0748ca-116e-4cc7-a6f4-cee44ccb2631" width=50% />
<img src="https://github.com/neirosetochka/MOEX-news-prediction/assets/72963340/046f38eb-1c25-424f-b43f-c33b6feabdcf" width=40% />
</p>

## Признаки
Наше признаковое пространство состоит из следующих компонент:
* данные предыдущего дня (close, divisor, capitalization);
* временные данные (день, месяц, день недели);
* новости (политика, финансы, экономика).

## Представление состояния на текущий день
Каждый день должен характеризоваться «состоянием мира» на данный момент: то есть, мы должны иметь вектор, аггрегирующий информацию о новостях сегодняшего дня и всех предыдущих (он также он должен легко обновляться при появлении новой статьи).
Поэтому мы:
  1. Получили векторное представление всех статей с помощью BERT
  2. С помощью PCA понизили размерность этих представлений.
  3. Каждый день представили средним арифметическим получившихся на шаге 2 представлений (обозначим $v_t$).
  4. Для каждого дня получили его представление с учетом предыдущей истории с помощью скользящего среднего: $h_t = \alpha * h_{t-1} + (1 - \alpha) * v_t$ 
## Результаты
Модель хорошо уловила тенденцию цены индекса:
<p align="center">
<img src=="https://github.com/neirosetochka/MOEX-news-prediction/assets/72963340/e00ad612-10b6-43d1-81b0-e6f1d05853f4" width=100%> 
</p>
