
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const app = express();
const coursesRouter =require('./Router/courses.route');
const {ERROR} =require('./utils/httpStatus')


async function main(){
    await mongoose.connect(process.env.MONGO_URL)
}
main();

app.use(express.json())
app.use('/api/courses' ,coursesRouter);
app.all("*" ,(req ,res) =>{ // It defines a route that matches all http methodes and pathes
    res.status(400).json({
        status: ERROR,
        message: "These Resource is not avaliable"
    })
})

app.listen(process.env.PORT , () => {
    console.log("Listening to port ",process.env.PORT);
});



