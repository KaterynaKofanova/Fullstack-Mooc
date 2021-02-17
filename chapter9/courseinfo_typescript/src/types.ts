export interface courseParts{
    name: string,
    exerciseCount: number
}
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase{
    description: string;
}
  
interface CoursePartOne extends CoursePartDescription{
    name: "Fundamentals";
}
  
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartFour extends CoursePartDescription{
    name: "React components with TypeScript"
}
  
interface CoursePartThree extends CoursePartDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
  