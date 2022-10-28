const mongoose = require('mongoose');
let pathSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    destination: {
        type:String
        // type: mongoose.Schema.ObjectId,
        // ref: 'String'
    },

    origin: {
        type:String
        // type: mongoose.Schema.ObjectId,
        // ref: 'String'
    },

    // travelMode:{
    //     type:String
    // },

    vehicle:{
        // type:String
        type: mongoose.Schema.ObjectId,
        ref: 'Vehicle'
    },

    pathLength:{
        type:Number,
        default:0
    },

    user:{
        // type:String
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    emmision:{
        type:Number,
        default:0
    }

});
module.exports = mongoose.model('paths', pathSchema);