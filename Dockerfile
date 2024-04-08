FROM python:3.11

WORKDIR /app
COPY pyproject.toml /app/
RUN python3 -m pip config --user set global.timeout 150
RUN pip install poetry && poetry install
COPY ./app /app

CMD poetry run uvicorn main:app --host 0.0.0.0 --port 8080