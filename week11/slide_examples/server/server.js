const express = require('express') ;
const cors = require('cors') ;
const flip = require('flip-text') ;

const PORT = 3001;

const app = express() ;
app.use(cors());

app.get('/number',  (req,res)=>{
    const n = Math.floor(Math.random()*100)+1 ;
    res.json({number:n}) ;
}) ;

app.get('/flip', (req, res) => {
   const text = req.query.text ;
   const flipped = flip(text) ;
   setTimeout(()=>res.json({text: flipped}),1000 )
});

app.listen(PORT, ()=>{console.log(`running on port ${PORT}`)})
