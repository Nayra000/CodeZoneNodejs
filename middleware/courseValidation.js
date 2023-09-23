const {body} =require('express-validator')

const validateCourse = ()=>{
    return(
        [
            body("name").notEmpty().withMessage("Inavlid name").isLength({min:2 ,max :50}).withMessage("Length of name must be greater than 2 and less than 50")
            ,
            body("price").notEmpty().withMessage("Inavlid price")
            
        ]
    )
}

module.exports={validateCourse};