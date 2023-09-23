
const {validationResult, body} =require('express-validator')
let Course =require('../schema/course.model.js')



const getAllCourses = async (req, res) => {
    const courses =await Course.find()
    res.json(courses);
};

const getCourse =async (req ,res)=>{
    let id = req.params.id;
    let course = await Course.findById(id);
    if(course){
        res.json(course);
    }
    else{
        res.status(404).json({msg :"not found"});
    }

};

const updateCourse =async (req, res)=>{
    let id = req.params.id;
    let course =await Course.findByIdAndUpdate(id,{$set : {...req.body}});
    if(!course){
        return res.status(404).json({msg :"not found"});
    }
    
    res.status(201).json(course);

};

const addNewCourse =async (req ,res)=>{    
    const errors =validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let newCourse = new Course({...req.body});
    await newCourse.save();
    res.status(201).json(newCourse);
};

const deleteCourse = async(req ,res)=>{
    await Course.deleteOne({_id :req.params.id});
    res.status(200).json({"msg" :"deleted"})
   
};


module.exports ={
    getAllCourses,
    getCourse,
    updateCourse,
    addNewCourse,
    deleteCourse
}