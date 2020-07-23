from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

import pickle

from models.classify_models import ClassifyInput, ClassifyOutput

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_credentials=True,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

with open("./model.pickle", "rb") as pickle_file:
  logreg = pickle.loads(pickle_file.read())

@app.post("/classify", response_model=ClassifyOutput)
async def classify(features: ClassifyInput):
  return {"stage": logreg.predict([[
    features.colonoscopies,
    features.diarrhea,
    features.bleeding,
    features.recurrent_polyp,
    features.polyp_size,
    features.stool,
    features.age
  ]])}

if __name__ == '__main__':
  uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")