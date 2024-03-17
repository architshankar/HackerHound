const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config')

const app = express();

// app.use(express.static("../public"));

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware for URL-encoded data

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('login');
});

app.get("/signup", (req, res) => {
    res.render("signup");
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }


    //existingUser
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("Username already exists!")
    }
    else {

        // hashing the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // replaced original passowrd to hashed one 
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
})

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });

        if (!check) {
            res.send("No User Found!");
        }
        else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (isPasswordMatch) {
                res.render("home");
            }
            else {
                res.send("Wrong password entered");
            }
        }
    }
    catch(error){
        res.send("Error: " + error.message);
    }
});



const port = 4000;
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})