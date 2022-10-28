const mongoose = require('mongoose');
let warehouseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    type:{
        type:String
    },

    name:{
        type:String
    },

    location: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    }]


    

});
module.exports = mongoose.model('warehouses', warehouseSchema);