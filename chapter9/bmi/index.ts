import express = require('express');
const app = express();
import {calculateBmi} from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
    let height = Number(req.query.height)
    let weight = Number(req.query.weight)
   
    if(!isNaN(height)&&!isNaN(weight)){
        try{
            res.json({
                weight,
                height,
                bmi: calculateBmi(height, weight)
            })
        }catch(e){
            res.status(400).json({error:e.message})
        }
    }else{
        res.status(400).json({error:'malformatted parameters'})
    }

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});