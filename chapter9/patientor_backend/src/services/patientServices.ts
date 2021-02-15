import patients from '../../data/patients';

import {PatientEntry} from '../types';

const getPatientsAll = (): Array<PatientEntry> => {
    return patients;
};

const getPatientsSensored = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation})=>({
        id,
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }));
};

export default {
    getPatientsAll,
    getPatientsSensored
};