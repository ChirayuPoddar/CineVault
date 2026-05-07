const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    Name: {
        type: String,
        trim:true,
        required:true
    },
    Year: {
        type: Number,
        trim: true,
        required:true
    },
    Duration: {
        type: String
    },
    Image: {
        type: String,
        trim:true,
        default: "https://imgs.search.brave.com/AELl_uL94jIVMjZFfd5uwPj3YHfSQrUcVCHBErXcSuY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvODI2/MzM1OS9wZXhlbHMt/cGhvdG8tODI2MzM1/OS5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA",
        set: v => v === "" ? undefined : v
        
    },
    Director: {
        type: String,
        trim:true,
    },
    Genres: {
        type: String,
        trim:true
    },
    Desc: {
        type: String,
        trim: true,
        required:true
    },
    Reviews: [{
        rating: {
            type:Number,
            min: 0,
            max:5
        },
        Comment: {
            type:String
        }
    }],
    trailer: {
        type:String
    },
    imdb: {
        type:String
    }
})

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;
