import mongoose from "mongoose";
import validator from "validator";

const msgSchema =new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        validate: [validator.isEmail,"Provide a valid email !"],
    },
    number:{
        type : String,
        required : true,
    },
    course :{
        type : String ,
        required : true
    },
    specialization : {
        type : String,
    }
    
});

export default mongoose.model("msg",msgSchema);