var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var adoptionCenterSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    name: { type: String, required: true },
    address: { type: String },
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
adoptionCenterSchema.pre("save", async function(next) {
    const adoptionCenter = this;
    if (adoptionCenter.isModified("password")) {
      adoptionCenter.password = await bcrypt.hash(adoptionCenter.password, 8);
    }
    next();
  });

  //this method generates an auth token for the user
  adoptionCenterSchema.methods.generateAuthToken = async function() {
    const adoptionCenter = this;
    const token = jwt.sign({ 
    _id: adoptionCenter._id, 
    email: adoptionCenter.email, 
    name: adoptionCenter.name, 
    address: adoptionCenter.address
    },
    "secret");
    adoptionCenter.tokens = adoptionCenter.tokens.concat({ token });
    await adoptionCenter.save();
    return token;
  };

  //this method search for a user by email and password.
  adoptionCenterSchema.statics.findByCredentials = async (email, password) => {
    const adoptionCenter = await AdoptionCenter.findOne({ email });
    if (!adoptionCenter) {
      throw new Error({ error: "Invalid login details" });
    }
    const isPasswordMatch = await bcrypt.compare(password, adoptionCenter.password);
    if (!isPasswordMatch) {
      throw new Error({ error: "Invalid login details" });
    }
    return adoptionCenter;
  };

  const AdoptionCenter = mongoose.model("adoptionCenters", adoptionCenterSchema);
  module.exports = AdoptionCenter;  
