const mongoose = require("mongoose");

const FilmSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    duration_minutes: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    timestamps: true, 
    toJSON: {
        virtuals: true, 
        transform: (doc, ret) => {
            delete ret.__v; 
        }
    }
})

const Film = mongoose.model("Film", MovieSchema);

module.exports = Film;