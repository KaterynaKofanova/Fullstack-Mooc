export interface DiagnoseEntry{
    "code": string,
    "name": string,
    "latin"?: string
}

// export interface PatientEntry{
//     "id": string,
//     "name": string,
//     "dateOfBirth": string,
//     "ssn": string,
//     "gender": Gender,
//     "occupation": string
// }
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
  

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string
    };
}

interface HospitalEntry extends BaseEntry{
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string
    };
}
type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry = NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry;

export interface PatientEntry {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}
  
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}