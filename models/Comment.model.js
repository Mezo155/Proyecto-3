const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true // requerido
        },

        filmId: {
            type: String, // Cambiado a String
            required: true // Ahora es requerido
        },

        title: {
            type: String,
            required: true,
            minLength: 10
        },

        comment: {
            type: String,
            required: true,
            minLength: 10
        },

       
    }, 
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
