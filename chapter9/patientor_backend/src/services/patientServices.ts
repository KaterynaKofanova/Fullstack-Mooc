import patients from '../../data/patients';

import {PatientEntry, NewPatientEntry, Entry, NewEntry} from '../types';

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

const addEntry =(entry:NewEntry, id: string): Entry =>{
    const patient = getPatientById(id);
    if(patient){
        const newEntry ={
            id: Math.random().toString(36).substr(2, 9),
            ...entry
        };
        const updatedPatient = {...patient, entries : patient.entries.concat(newEntry)};
        patients.map(p => p.id=== id ? updatedPatient : p);
        return newEntry;
    }else{
        throw new Error ('Patient with specified id does not exist');
    }
};

export default {
    getPatientsAll,
    getPatientsSensored,
    addPatient,
    getPatientById,
    addEntry
};