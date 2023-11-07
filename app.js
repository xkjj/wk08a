const express = require('express');
const app = express();
const mysql = require('mysql2');

app.set('view engine', 'ejs');

//process FORM element data
app.use(express.urlencoded({extended: true}));

const db = mysql.createConnection({ 
    host:"localhost",
    user:"root",
    database:"kjarosz02",
    password:"",
    port:"3306",
});

db.connect((err) => {
    if(err) return console.log(err.message);

});

app.get("/in", (req, res) => { 

    res.render("input");

});

app.post("/process", (req, res) => { 

    //find and store data from <form> elements
    let myinput1 = req.body.input1;
    let myinput2 = req.body.input2;

    //process code on form data from web uuser
    myinput1 = myinput1.toLowerCase();
    myinput2 = myinput2.toLowerCase();

    let email = `${myinput1}${myinput2}@mycompany.com`

    let sqlinsert = `INSERT INTO web_dev_people (first, second, email) VALUES ('${myinput1}', '${myinput2}', '${email}');`

    db.query(sqlinsert, (err, result) => {
        if(err) throw err;
        res.send(`user added to system with email ${email}`);
    });
});

app.listen(3000);