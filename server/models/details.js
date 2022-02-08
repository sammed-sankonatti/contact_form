const mongoose = require('mongoose')

const DetailsSchema = new  mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    zipcode : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("DetailsSchema", DetailsSchema);