export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight/((height/100)^2);
    if (bmi<18.5) {
            return 'Underweight';
    }else if (bmi < 25){
        return 'Normal (healthy weight)';
    }else if (bmi < 30){
        return 'Overweight';
    }else{
        return 'Obese';
    }
};

// console.log(calculateBmi(180, 74))

interface BodyParams{
    height: number,
    weight: number
}

const checkArguments =( args:  Array<string>): BodyParams => {
    if (args.length < 4) throw new Error('Not enough data');
    if (args.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        };
      } else {
        throw new Error('Provided values were not numbers!');
      }
};

try{
    const {height, weight} = checkArguments(process.argv);
    console.log(calculateBmi(height, weight));
}catch(e){
    const message= (e as Error).message;
    console.log('Error message:', message);
}
