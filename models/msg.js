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
    subject:{
        type : String,
    },
    msg :{
        type : String ,
        required : true
    },
    
});

export default mongoose.model("msg",msgSchema);