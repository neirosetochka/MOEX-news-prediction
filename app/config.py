import os


GLOBAL_CONFIG = {
    "MODEL_PATH": "models",
}

ENV_CONFIG = {
    "development": {"DEBUG": True, "ROUND_DIGIT": 3},
    "staging": {"DEBUG": True},
    "production": {"DEBUG": False, "ROUND_DIGIT": 3},
}


def get_config() -> dict:
    ENV = os.environ["PYTHON_ENV"] if "PYTHON_ENV" in os.environ else "development"
    ENV = ENV or "development"

    if ENV not in ENV_CONFIG:
        raise EnvironmentError(f"Config for envirnoment {ENV} not found")

    config = GLOBAL_CONFIG.copy()
    config.update(ENV_CONFIG[ENV])

    config["ENV"] = ENV

    return config


# load config for import
CONFIG = get_config()

if __name__ == "__main__":
    import json

    print(json.dumps(CONFIG, indent=4))
