
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const coursesRouter =require('./Router/courses.route');


async function main(){
    await mongoose.connect('mongodb+srv://Nayra:nodejs123@cluster0.5eou9di.mongodb.net/code-zone?retryWrites=true&w=majority&appName=AtlasApp')
}
main();
app.use(express.json())
app.use('/api/courses' ,coursesRouter);

app.listen(3000, () => {
    console.log("Listening to port 3000");
});



