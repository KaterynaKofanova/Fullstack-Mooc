import express from 'express';
const router = express.Router();

import patientService from '../services/patientServices';
import toNewPatientEntry from '../utils';

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsSensored());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if(patient){
    res.send(patient);
  }else{
  res.status(400).send('Patient with specified id does not exist');
  }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
    
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
      }
});

export default router;