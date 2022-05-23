const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { resourceUsage } = require("process");
const app = express();
require("./db/conn");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use(express.static('public'))

app.use(express.static('public/images')); 

// app.use(express.static("images"));

// app.get("/static", (req, res) => {
//     res.render("static");
// });

const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );
const static_path = path.join(__dirname, "../public" );


const mongoose = require('mongoose');
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost:27017/EduFormSubmission');

const formSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    text:String
});

const Form = mongoose.model("formData", formSchema);




//console.log(path.join(__dirname, "../public" ));

app.use(express.static(static_path)); 
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/",function(req,res) {
    
    const form = new Form({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        text:req.body.text 
    });

    form.save();

    res.send(req.body.name  + "Thank you for submitting the form!")
});

// app.get("", (req, res) => {
//     res.render("");
// })

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});




///backend/public/imgs/Adnan.jpeg