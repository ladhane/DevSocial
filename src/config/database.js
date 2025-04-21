const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://learnnodejs:X4uo9ngOtYOKiFlq@learnnodejs.kwb8gen.mongodb.net/DevSocial')
}

module.exports = { connectDB }