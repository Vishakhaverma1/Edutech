import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
    },
    mobilenumber:{
        type : Number,
        required : true
    },
    email :{
        type : String,
        required : true,
        validate: [validator.isEmail,"Provide a valid email !"],
    },
    twelvenumber :{
        type : String,
        required : true
    },
    city :{
        type : String
    },
},
{
    timestamps : true
}
);

export default mongoose.model("Newuser",userSchema);