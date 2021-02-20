/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { NewPatientEntry, Gender, NewEntry, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param:any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (entry: any): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing name: ${entry}`);
  }
  return entry;
};

const parseSsn = (entry: any): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing ssn: ${entry}`);
  }
  return entry;
};

const parseOccupation = (entry: any): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing occupation: ${entry}`);
  }
  return entry;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date of birth: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error(`Incorrect or missing geder: ${gender}`);
  }
  return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries : object.entries
  };

  return newEntry;
};

const isEntryType = (type: any): boolean => {
  if(type==="HealthCheck" || type==="OccupationalHealthcare" || type==="Hospital"){
    return true;
  }
  return false;
};

const parseEntryType = (type:any): string => {
  if(!isString(type) || !isEntryType(type)){
    throw new Error(`Incorrect or missing type of entry: ${type}`);
  }
  return type;
};

const parseEntryDescription= (entry: any): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing description: ${entry}`);
  }
  return entry;
};
const parseEntrySpecialist = (entry: any): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing specialist: ${entry}`);
  }
  return entry;
};
const parseEntryCriteria = (entry: any): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing criteria: ${entry}`);
  }
  return entry;
};

const isRating = (param:any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if(!rating || !isRating(rating)){
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};

const parseEntryEmployer = (entry: any): string => {
  if (!entry || !isString(entry)) {
    throw new Error(`Incorrect or missing employer Name: ${entry}`);
  }
  return entry;
};

export const toNewEntry = (object: any): NewEntry => {
  const type = parseEntryType(object.type);
  switch(type){
    case "HealthCheck":
     return {
        description: parseEntryDescription(object.description),
        date: parseDate(object.date),
        specialist: parseEntrySpecialist(object.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : [],
        type: type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
     };
    case "OccupationalHealthcare":
      if(object.sickLeave){
        return {
          description: parseEntryDescription(object.description),
          date: parseDate(object.date),
          specialist: parseEntrySpecialist(object.specialist),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : [],
          type: type,
          employerName: parseEntryEmployer(object.employerName),
          sickLeave:{
              startDate: parseDate(object.sickLeave.startDate),
              endDate: parseDate(object.sickLeave.endDate)
          }
        };
      }
        return {
          description: parseEntryDescription(object.description),
          date: parseDate(object.date),
          specialist: parseEntrySpecialist(object.specialist),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : [],
          type: type,
          employerName: parseEntryEmployer(object.employerName),
        };
    case "Hospital":
      return {
        description: parseEntryDescription(object.description),
        date: parseDate(object.date),
        specialist: parseEntrySpecialist(object.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : [],
        type: type,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseEntryCriteria(object.discharge.criteria)
        }
      };
      default:
        throw new Error(`Incorrect or missing type of entry: ${type}`);
  }
};

export default toNewPatientEntry;