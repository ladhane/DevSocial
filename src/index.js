const express = require('express');
const PORT = 3000;
const app = express();

app.use('/test',(req,res)=>{
    res.send('Hello to the test')
})

app.use('/hello',(req,res)=>{
    res.send('Hello to the Hello World')
})

app.use('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})