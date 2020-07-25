# Colorectal Cancer Predication/Classification App
SMART on FHIR App that uses a machine learning model to predict and classify a patient's colorectal cancer (CRC) stage.

It uses a logistic regression model from `Python`'s `scikit-learn` that had been pickled and loaded into a `FastAPI` back end that serves an endpoint `/classify` that allows users to pass inputs into it and returns back the stage (if any) of a patient's CRC. When loading the `React` UI, the page fetches all the features of interest from the patient's record and makes a call to the `/classify` endpoint to make the predication/classification.

# How to Run
The server can be run by using `uvicorn main:app --reload` from the `server` directory.

The client can be run by using `npm start` or `yarn start` from the `client` directory and loading it into a SMART sandbox such as [Logica Sandbox](https://sandbox.logicahealth.org/) or running your own [Docker compose set up](https://github.com/smart-on-fhir/smart-dev-sandbox/issues).