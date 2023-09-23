
const mongoose = require('mongoose');

const courseSchema =new mongoose.Schema({  //Schema is a class in mongoose object
    name :{
        type :String ,
        required :true
    } ,
    price :{
        type:Number ,
        required :true
    }
})

const Course =  mongoose.model('Course' , courseSchema); //Name pf model is uppercase and singular and when model create the collection make it lowercase and add s at the end      

module.exports=Course;