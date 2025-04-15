const express = require('express');
const PORT = 3000;
const app = express();

//this will handle only the GET method API call
app.get(('/user'),(req,res)=>{
    res.send({firstname:'John',lastname:'Doe'})
})

//this will handle only the POST method API call
app.post('/user/:id',(req,res)=>{
    console.log(req.params)
    res.send("Posted successfully!");
})

app.post('/user',(req,res)=>{
    console.log(req.query)
    res.send("Posted successfully!");
}
)

//this will handle only the DELETE method API call
app.delete('/user',(req,res)=>{
    res.send("Deleted successfully!");
})

//this will handle only the PUT method API call
app.put('/user',(req,res)=>{
    res.send("Put done successfully!");
})

//this will handle only the PATCH method API call   
app.patch('/user',(req,res)=>{
    res.send("Patch done successfully!");
})


//this will match all the http methods API call
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