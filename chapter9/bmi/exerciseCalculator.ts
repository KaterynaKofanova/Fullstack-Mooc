interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const  calculateExercises = (exercise: Array<number>, target: number): Result =>{
    const periodLength = exercise.length
    const trainingDays = exercise.filter(e => e > 0).length
    const average = exercise.reduce((a,b) => a+b, 0)/ periodLength
    let success 
    let rating
    let ratingDescription
    if(average >= target){
        success = true
        rating = 3
        ratingDescription = 'Great job!'
    }else if( average/target >= 0.5){
        success = false
        rating = 2
        ratingDescription = 'Not too bad, but try to improve next  time!'
    }else{
        success = false
        rating = 1
        ratingDescription = 'You did less than a half of planeed exercises.'
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

interface Input{
    exercise: Array<number>,
    target: number
}

const parseArguments =( args:  Array<string>): Input => {
    if (args.length < 4) throw new Error('Not enough data');
    const exercise = args.slice(3).map(a=>Number(a))
    const allNumbers = exercise.every(e => !isNaN(e))
    if (!isNaN(Number(args[2])) && allNumbers) {
        return {
          exercise,
          target: Number(args[2])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
try{ 
    const {exercise, target} = parseArguments(process.argv);
    console.log(calculateExercises(exercise, target))
}catch(e){
    console.log('Error message:', e.message)
}