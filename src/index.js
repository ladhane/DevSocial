const express = require('express');
const { authUser } = require('./middlewares/auth');
const { connectDB } =require('./config/database');
const  { User } = require('./models/user');
const PORT = 3000;
const app = express();

app.use(express.json())
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

app.post('/signup',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        res.send('User added successfully')
    }catch(err){
        res.status(500).send('Error adding user:', err);
    }
})

connectDB().then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});