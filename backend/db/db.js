const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const response = await mongoose.connect("mongodb+srv://kritesh:kritesh@cluster0.dyjewhk.mongodb.net/crudDB")
        if(response){
            console.log("MongoDB Connected")
        }
    } catch (error) {
        console.log("Error Occured")
    }
}

module.exports = connectDB