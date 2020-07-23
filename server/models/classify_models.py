from fastapi_camelcase import CamelModel

class ClassifyInput(CamelModel):
  colonoscopies: int
  diarrhea: int
  bleeding: int
  recurrent_polyp: int
  polyp_size: float
  stool: float
  age: int

class ClassifyOutput(CamelModel):
  stage: int