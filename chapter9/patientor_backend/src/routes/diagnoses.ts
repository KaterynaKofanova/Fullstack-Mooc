import express from 'express';
const router = express.Router();

import diagnoseService from '../services/diagnoseServices';

router.get('/', (_req, res) => {
    res.send(diagnoseService.getDiagnoses());
});

export default router;