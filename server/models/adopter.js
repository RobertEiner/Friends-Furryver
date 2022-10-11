var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var adopterSchema = new Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
    ssn: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number },
    species: { type: String },
    size: { type: String },
    hours: { type: Number, required: true },
    personality: { type: String },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

//this method will hash the password before saving the user model
adopterSchema.pre("save", async function(next) {
    const adopter = this;
    if (adopter.isModified("password")) {
      adopter.password = await bcrypt.hash(adopter.password, 8);
    }
    next();
  });
  
  //this method generates an auth token for the user
  adopterSchema.methods.generateAuthToken = async function() {
    const adopter = this;
    const token = jwt.sign({ 
    _id: adopter._id, 
    email: adopter.email, 
    ssn: adopter.ssn, 
    name: adopter.name, 
    age: adopter.age, 
    species: adopter.species, 
    size: adopter.size, 
    hours: adopter.hours, 
    personality: adopter.hours },
    "secret");
    adopter.tokens = adopter.tokens.concat({ token });
    await adopter.save();
    return token;
  };
  
  //this method search for a user by email and password.
  adopterSchema.statics.findByCredentials = async (email, password) => {
    const adopter = await Adopter.findOne({ email });
    if (!adopter) {
      throw new Error({ error: "Invalid login details" });
    }
    const isPasswordMatch = await bcrypt.compare(password, adopter.password);
    if (!isPasswordMatch) {
      throw new Error({ error: "Invalid login details" });
    }
    return adopter;
  };

  const Adopter = mongoose.model("adopters", adopterSchema);
  module.exports = Adopter;  

