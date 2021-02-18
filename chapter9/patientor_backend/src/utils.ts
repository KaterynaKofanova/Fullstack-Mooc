/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { NewPatientEntry, Gender } from './types';

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

export default toNewPatientEntry;