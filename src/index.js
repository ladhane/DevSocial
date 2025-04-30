const express = require('express');
const { authUser } = require('./middlewares/auth');
const { connectDB } =require('./config/database');
const  { User } = require('./models/user');
const PORT = 3000;
const app = express();

app.use(express.json())
app.use('/admin', authUser)


//get feed
app.get('/feed',async(req,res)=>{
    try{
        const users = await User.find({});
        if(!users){
            return res.status(404).send('No users found')
        }
        res.send(users);
    }catch(err){
        res.status(500).send('Error fetching users:', err);
    }
})

app.post('/signup',async (req,res)=>{
    const user = new User(req.body)
    const allowedFields = ['firstName','lastName','email','password']
    const isValidUser = Object.keys(req.body).every(key => allowedFields.includes(key));
    if(!isValidUser){
        return res.status(400).send('Invalid user data')
    }
    try{
        const data = await user.save();      
        res.send(data)
    }catch(err){
        res.status(500).send('Error adding user:'+ err.message);
    }
})

//Get user by email
app.get('/user',async(req,res)=>{
    if(!req.body?.email){
        return res.status(400).send('Email is required')
    }
    try{
        const user = await User.findOne({email: req.body?.email})
        if(!user){
            return res.status(404).send('User with given email not found')
        }
        res.send(user);
    }catch(err){
        res.status(404).send('user not found')
    }
})

//update user based on email
app.patch('/user/:email',async(req,res)=>{
    const userEmail = req.params?.email;
    if(!userEmail){
        return res.status(400).send('Email is required')
    }
    const allowedFields = ['firstName','lastName','gender','age','photoUrl','about','skills']
    const isValidUpdate = Object.keys(req.body).every(key => allowedFields.includes(key));
    if(!isValidUpdate){
        return res.status(400).send('Invalid update fields')
    }

    try{
        const user = await User.findOneAndUpdate({email: userEmail},req.body,{returnDocument: 'after', runValidators: true})
        if(!user){
            return res.status(404).send('User with given email not found')
        }
        res.send(user)
    }catch(err){
        res.status(404).send('ERROR updating data' + err.message)
    }
})

// //post new user
// app.post('/user',async(req,res)=>{
//     const user = req.body;
//     try{
//         const insertedUser = await User.create(user);
//         res.status(200).send(insertedUser)
//     }catch(err){
//         res.status(500).send('Error adding data'+ err.message)
//     }
// })


//get user by id
app.delete('/user',async(req,res)=>{   
    console.log(req.body)
    if(!req.body?.id){
        return res.status(400).send('ID is required')
    }
    try{
        // const user = await User.findByIdAndDelete(req.body.id)
        const user = await User.findByIdAndDelete({_id: req.body?.id})
        if(!user){
            return res.status(404).send('User with given ID not found')
        }
        res.send('User deleted successfully');
    }catch(err){
        res.status(404).send('user not found')
    }
})

//update user based on ID
// app.patch('/user',async(req,res)=>{
//     const userId = req.body.id
//     try{
//         const user = await User.findByIdAndUpdate(userId,req.body,{returnDocument: 'after'})
//         res.send(user)
//     }catch(err){
//         res.status(404).send('User Not Found!!')
//     }
// })

connectDB().then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});