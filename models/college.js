import mongoose from "mongoose";
import validator from "validator";

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email !"],
  },
  number: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  program:{
    type: String,
    required: true,
  },
  city:{
    type : String,
    required : true,
  },
  course : {
    type : String,
    required : true
  },
  specialization :{
    type : String,
    required : true
  },
  heading: {
    type: String,
    required: true,
  },
});

export default mongoose.model("college", collegeSchema);
