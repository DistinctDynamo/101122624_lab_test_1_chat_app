const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: [true, "No username entered"],
        trim: true,
        unique: true
    },
    first_name:{
        type: String,
        require: [true, "No first name entered"],
        trim: true
    },
    last_name:{
        type: String,
        require: [true, "No last name entered"],
        trim: true
    },
    password:{
        type: String,
        require: [true, "No password entered"],
        trim: true
    },createon:{
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(next) {
  try {
    this.createon = Date.now();

    if (!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
     
  } catch (error) {
    next(error); 
  }
});

userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

module.exports = mongoose.model('User', userSchema);