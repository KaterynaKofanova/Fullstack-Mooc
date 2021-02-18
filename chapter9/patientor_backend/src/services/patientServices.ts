import patients from '../../data/patients';

import {PatientEntry, NewPatientEntry} from '../types';

const getPatientsAll = (): Array<PatientEntry> => {
    return patients;
};

const getPatientsSensored = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries})=>({
        id,
        name, 
        dateOfBirth, 
        gender, 
        occupation,
        entries
    }));
};

const getPatientById = (id:string) : PatientEntry | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (entry:NewPatientEntry): PatientEntry =>{
    const newPatientEntry = {
        id: Math.random().toString(36).substr(2, 9),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatientsAll,
    getPatientsSensored,
    addPatient,
    getPatientById
};