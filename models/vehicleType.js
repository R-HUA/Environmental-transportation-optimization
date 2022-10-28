const mongoose = require('mongoose');
let vehicleTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    typeName: {
        type: String,
        required: true
    },

    typeGasCost: {
        type:Number,
        min:0,
        default: 0
    },

    displacement: {
        type:Number,
        min:0,
        default: 0
    },


    typeGas: {
        type:Number,
        min:0,
        default: 0
    }

});
module.exports = mongoose.model('vehicleTypes', vehicleTypeSchema);