const mongoose = require('mongoose');
let adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String
    },


    password:{
        type:String,
        required:true,
        default:"1234"

    },


});
module.exports = mongoose.model('admins', adminSchema);