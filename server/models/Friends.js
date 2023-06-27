const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     age:{
        type:String,
        required:false
     },
     desciption:{
        type:String,
        required:false
     }
})

const FriendModel = mongoose.model('friends',FriendSchema)

module.exports = FriendModel