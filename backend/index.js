const express =  require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

//connectivity to the database
const DB = require("./config/db");

app.use('/public', express.static('public/uploads'))
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//api
const User = require("./api/user");


app.get("/",(req,res)=>{
    res.send("server runing");
})



app.use(User);

const PORT=process.env.PORT || 5000 

app.listen(PORT,()=>{
    console.log("server runing",PORT);
})