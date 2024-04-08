class Model:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def forward(self, *args, **kwargs):
        return [42.0, 1, 2, 3]

    def __call__(self, *args, **kwargs):
        return self.forward(*args, **kwargs)
