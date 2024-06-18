const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ROUNDS = 10;

const EMAIL_PATTERN = 
/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "required field"],
            trim: true,
            
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            minlength: [3, "invalid length"],
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals:true,
            transform: (doc, ret) => {
                delete ret.__v
            },
        },
    }
);

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
      bcrypt
        .hash(this.password, ROUNDS)
        .then((hash) => {
          this.password = hash;
          next();
        })
        .catch(next);
      // .catch(err => next(err))
    } else {
      next();
    }
  });

  UserSchema.methods.checkPassword = function (passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
  };
  
const User = mongoose.model("User", UserSchema)

module.exports = User; 