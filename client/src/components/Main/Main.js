import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectClient } from '../../features/smartSlice';

const Main = () => {

  const client = useSelector(selectClient);

  const [inputs, setInputs] = useState({
    colonoscopies: 0,
    diarrhea: 0,
    bleeding: 0,
    recurrentPolyp: 0,
    polypSize: 0,
    stool: 0,
    age: 0
  });

  const [pendingQueries, updatePendingQueries] = useState(Object.keys(inputs).length);

  const [stage, setStage] = useState(-1);

  useEffect(() => {
    const colonscopyQuery = new URLSearchParams();
    colonscopyQuery.set("code", "http://snomed.info/sct|73761001");
    colonscopyQuery.set("subject", client.patient.id);
    
    client.request(`Procedure?${colonscopyQuery}`)
      .then((bundle) => {
        setInputs(currentState => ({
          ...currentState,
          colonoscopies: bundle.entry ? bundle.entry.length : 0,
        }));

        updatePendingQueries(curr => curr - 1);
      });

    const diarrheaQuery = new URLSearchParams();
    diarrheaQuery.set("code", "http://snomed.info/sct|236077008");
    diarrheaQuery.set("subject", client.patient.id);

    client.request(`Condition?${diarrheaQuery}`)
      .then((bundle) => {
        setInputs(currentState => ({
          ...currentState,
          diarrhea: bundle.entry ? bundle.entry.length : 0,
        }));

        updatePendingQueries(curr => curr - 1);
      });

    const bleedingQuery = new URLSearchParams();
    bleedingQuery.set("code", "http://snomed.info/sct|6072007");
    bleedingQuery.set("subject", client.patient.id);

    client.request(`Condition?${bleedingQuery}`)
      .then((bundle) => {
        setInputs(currentState => ({
          ...currentState,
          bleeding: bundle.entry ? bundle.entry.length : 0,
        }));

        updatePendingQueries(curr => curr - 1);
      });

    const recurrentPolypQuery = new URLSearchParams();
    recurrentPolypQuery.set("code", "http://snomed.info/sct|713197008");
    recurrentPolypQuery.set("subject", client.patient.id);

    client.request(`Condition?${recurrentPolypQuery}`)
      .then((bundle) => {
        setInputs(currentState => ({
          ...currentState,
          recurrentPolyp: bundle.entry ? bundle.entry.length : 0,
        }));

        updatePendingQueries(curr => curr - 1);
      });

    const polypSizeQuery = new URLSearchParams();
    polypSizeQuery.set("code", "http://loinc.org|33756-8");
    polypSizeQuery.set("subject", client.patient.id);

    client.request(`Observation?${polypSizeQuery}`)
      .then((bundle) => {
        const polypSizes = bundle.entry ? bundle.entry
          .map(({ resource }) => client.getPath(resource, 'valueQuantity.value')) : [];

        setInputs(currentState => ({
          ...currentState,
          polypSize: Math.max(...polypSizes)
        }));

        updatePendingQueries(curr => curr - 1);
      });

    const stoolQuery = new URLSearchParams();
    stoolQuery.set("code", "http://loinc.org|57905-2");
    stoolQuery.set("subject", client.patient.id);

    client.request(`Observation?${stoolQuery}`)
      .then((bundle) => {
        const stools = bundle.entry ? bundle.entry
          .map(({ resource }) => client.getPath(resource, 'valueQuantity.value')) : [];

        setInputs(currentState => ({
          ...currentState,
          stool: Math.max(...stools)
        }));

        updatePendingQueries(curr => curr - 1);
      });

    client.patient.read()
      .then(({ birthDate }) => {
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        setInputs(currenState => ({
          ...currenState,
          age
        }));
        updatePendingQueries(curr => curr - 1);
      }); 
  }, [client]);

  useEffect(() => {
    if (pendingQueries === 0) {
      fetch('http://localhost:8000/classify', {
        method: 'POST',
        body: JSON.stringify(inputs)
      })
      .then(res => res.json())
      .then((classification) => {
        setStage(classification.stage);
      });
    }
  }, [pendingQueries, inputs]);

  let text = '';

  switch(stage) {
    case -1: {
      text = 'Analyzing...';
      break;
    }
    case 0: {
      text = "You don't have cancer!";
      break;
    }
    case 1: {
      text = "You have Stage I cancer.";
      break;
    }
    case 2: {
      text = "You have Stage II cancer.";
      break;
    }
    case 3: {
      text = "You have Stage III cancer.";
      break;
    }
    case 4: {
      text = "You have Stage IV cancer.";
      break;
    }
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {text}
      </h1>
    </div>
  );
}

export default Main;