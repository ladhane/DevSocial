const express = require('express');
const PORT = 3000;
const app = express();

app.use('/user',(req,res,next)=>{
    console.log('Handling user 1!!')
    next();
    // res.send('user 1');
},(req,res,next)=>{
    console.log('Handling user 2!!')
    next()
    res.send('user 2');
},(req,res,next)=>{ 
    console.log('Handling user 3!!')
    next()
    // res.send('user 3');
},(req,res,next)=>{
    console.log('Handling user 4!!')
    next()
    // res.send('user 4');
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})