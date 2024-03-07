const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    "name" : {
        type : String,
        required : true
    },
    "lastName" : {
        type : String,
        required : true
    },
    "email" : {
        type : String,
        required : true,
    },
    "mobile" : {
        type : Number,
        required : true,
    },
    "project" : {
        type : String,
        required : true,
    }
})

const Client = mongoose.model("Client",clientSchema)

module.exports = Client