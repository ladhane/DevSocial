const express = require('express');
const { authUser } = require('./middlewares/auth');
const PORT = 3000;
const app = express();

app.use('/admin', authUser)
app.get('/admin/getAllData',(req,res)=>{
    res.send([{fname: 'John', lname: 'Doe'},{fname: 'Jane', lname: 'Doe'}])
})
app.post('/admin/addData',(req,res)=>{
    res.send('Data added successfully')
})
app.delete('/admin/deleteData',(req,res)=>{
    res.send('Data deleted successfully')
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})