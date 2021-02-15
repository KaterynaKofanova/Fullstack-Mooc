import express from 'express';
const router = express.Router();

import patientService from '../services/patientServices';

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsSensored());
});

export default router;