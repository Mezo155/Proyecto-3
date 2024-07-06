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

        imgUrl: {
          type: String,
          default: 'https://res.cloudinary.com/dqtcw4sme/image/upload/f_auto,q_auto/vx6fggezedsqidnide34'
        }
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

UserSchema.virtual("likes", { //Se define un campo virtual "registros" en el userSchema
  ref: "Like",
  foreignField: "userId", //En el modelo registro se va a usar el campo user para establecer relacion con el modelo Like
  localField: "_id", //En el modelo usuario que se va a usar para establecer relacion con el modelo Like
  justOne: false, //Con false, el mismo usuario se puede registrar en varios eventos
});

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