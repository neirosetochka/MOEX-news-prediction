from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class NewsData(BaseModel):
    url: str = Field(title="Url", max_length=500)
    title: str = Field(title="Title")
    description: str = Field(title="Description")
    publishedAt: datetime = Field(title="Published At")


class TimeSeriesData(BaseModel):
    date: datetime = Field(title="Date")
    value: float = Field(title="Value")


class TimeSeriesDataList(BaseModel):
    data: list[TimeSeriesData]


class NewsDataList(BaseModel):
    data: list[NewsData]


class InferenceInput(BaseModel):
    time_series_data: TimeSeriesDataList
    news_data: NewsDataList
    confidence_level: float = Field(title="Confidence Level", ge=0, le=1)
    date_to_predict: datetime

    def __repr__(self):
        return f"test cl {self.confidence_level}"

    def __str__(self):
        return f"test cl {self.confidence_level}"


class InferenceOutput(BaseModel):
    predicted_value: float
    predicted_confidence_interval_lower_bound: float
    predicted_confidence_interval_upper_bound: float
    text: str


class ErrorResponse(BaseModel):
    error_message: str
    error_stacktrace: str


class InferenceResponse(BaseModel):
    data: InferenceOutput
