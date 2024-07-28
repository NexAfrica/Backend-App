import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
 fullname: {
    type:String,
    required: true, 
   
 },
 email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
          // Email regex for basic email validation
          return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
  }
 },
 userName: {
    type: String,
    required: true,
 },

 password: {
    type: String,
    required: true,
    minLength:6
 },
 role: {
    type: String,
    enum: ['user', 'admin', 'recruiter'],
    default: 'user',
    required: true,
},
 createdAt:  {
    type:String,
    default: Date.now
   
 }
})
// define the compare password function (this help to compare the harshed password and the entered password)

userSchema.methods.comparePassword=async function(password){
    const match = await bcrypt.compare(password, this.password);
    return match
}
const User = mongoose.model("User",userSchema)

export default User