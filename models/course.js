import mongoose from "mongoose";
import validator from "validator";

const courseSchema = new mongoose.Schema({
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
  city: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
});

export default mongoose.model("course", courseSchema);
