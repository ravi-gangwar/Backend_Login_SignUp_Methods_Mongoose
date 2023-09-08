const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name:{
        type: String,
        require: [true, 'Name is Required'],
        minLength: [3, "minimum 3 character required"],
        maxLength:[20, 'maximum 20 character only'],
        trim: true
    },
    email:{
        type:String,
        require:[true, "Email"],
        unique: [true, "already exist"],
        lowercase: true
    },
    password:{
        type:String,
        require: [true, "password rqed"],
        minLength: [8, "minimum 8 character"],
        select: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiryDate: {
        type: Date
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);

    return next();
})

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;