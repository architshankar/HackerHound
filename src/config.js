const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://archit_shankar:06keoaEVd8ofe0pB@cluster0.rgtxbqt.mongodb.net/HackerHound");

connect.then(()=>{
    console.log("Database connected");
})
.catch(()=>{
    console.log("Database failed to connect !");
});

const loginSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users" , loginSchema);

module.exports = collection;