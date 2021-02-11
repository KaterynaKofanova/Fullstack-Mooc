import express = require('express');
const app = express();
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
   
    if(!isNaN(height)&&!isNaN(weight)){
        try{
            res.json({
                weight,
                height,
                bmi: calculateBmi(height, weight)
            });
        }catch(e){
            const message= (e as Error).message;
            res.status(400).json({error: message});
        }
    }else{
        res.status(400).json({error:'malformatted parameters'});
    }

});

interface ExerciseParams{
    daily_exercises: Array<number>,
    target: number
}

app.post('/exercises', (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ExerciseParams = req.body;
    const target = Number(body.target);
    const daily_exercises : Array<number> = body.daily_exercises.map(e => Number(e));
   
    if(!body.target || !body.daily_exercises){
        res.status(400).json({error: 'parameters missing'});
    }
    if(isNaN(Number(target)) || daily_exercises.every(e => isNaN(Number(e)))){
        res.status(400).json({error: 'malformatted parameters'});
    }
    res.status(200).json((calculateExercises(daily_exercises, target)));

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});