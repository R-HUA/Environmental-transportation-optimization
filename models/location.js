const mongoose = require('mongoose');
let locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    lat: {
        type:Number
    },
    lng: {
        type:Number
    }
    

});
module.exports = mongoose.model('locations', locationSchema);