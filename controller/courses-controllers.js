const {SUCCESS ,FAIL ,ERROR} =require('../utils/httpStatus')

const {validationResult, body} =require('express-validator')
let Course =require('../schema/course.model.js')



const getAllCourses = async (req, res) => {
    const query = req.query;
    const limit =query.limit ||3 ;
    const page =query.page ||1 ;  
    //Note I don't pass the limit and page in the url and not make default values it will raise an error
    const skip =(page -1) *limit ;
    try{
    const courses =await Course.find({} , {"__v" :false}).limit(limit).skip(skip);
    res.status(200).json({
        "status": SUCCESS,
        "data":{courses} //equavelant to  {"courses": courses }
    });
    }
    catch(err){
        return res.status(400).json({
            "status" :ERROR ,
            "message" :err.message
        })

    }   
};

const getCourse =async (req ,res)=>{
    let id = req.params.id;
    try{
    let course = await Course.findById(id);
    if(course){
        res.status(200).json({
            "status": SUCCESS,
            "data":{course} //equavelant to  {"courses": courses }
        });
    }
    else{
        res.status(404).json({"status": FAIL ,"data":null});
    }
    }
    catch(err){
        return res.status(400).json({
            "status" :ERROR,
            "message" :err.message
        })
    }

};

const updateCourse =async (req, res)=>{
    let id = req.params.id;
    try{
    let course =await Course.findByIdAndUpdate(id,{$set : {...req.body}});
    if(!course){
        return res.status(404).json({"status": FAIL ,"data":null});
    }
    res.status(201).json({
        "status": SUCCESS,
        "data":{course} //equavelant to  {"courses": courses }
    });}
    catch(err){
        return res.status(400).json({
            "status" :ERROR,
            "message" :err.message
        })};
}

const addNewCourse =async (req ,res)=>{    
    const errors =validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:FAIL ,
            data :errors.array()
        });
    }
    try{
    let newCourse = new Course({...req.body});
    await newCourse.save();
    res.status(201).json({
        status :SUCCESS ,
        data:newCourse
    });
    }
    catch(err){
        return res.status(400).json({
            "status" :ERROR,
            "message" :err.message
        })
    }
};

const deleteCourse = async(req ,res)=>{
    try{
    await Course.deleteOne({_id :req.params.id});
    res.status(200).json({
        "status": SUCCESS,
        "data":null
    })
    }
    catch(err){
        return res.status(400).json({
            "status" :ERROR,
            "message" :err.message
        })
    }
   
};


module.exports ={
    getAllCourses,
    getCourse,
    updateCourse,
    addNewCourse,
    deleteCourse
}