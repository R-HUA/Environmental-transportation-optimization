const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // name: {
    //     firstName: {
    //         type: String,
    //         required: true
    //     },
    //     lastName: String
    // },
    name:{
        type:String,
        required:true
    },

    birthDay:{
        type:Date,
        default: Date.now
    },

    address:{
        state:{
            type:String,
            validState: {
                validStater: function (stateValue) {
                    return stateValue.length >= 2 && stateValue.length  <= 3;
                },
                message: 'state min 2, max 3 character'
            }
        },
        suburb:{
            type:String
        },
        street: {
            type: String
        },
        unit:{
            type:String
        }

    },

    phone: {
        type:String,
        default: "000-000-0000"

    },


    password:{
        type:String,
        required:true,
        default:"1234"

    }

});
module.exports = mongoose.model('drivers', userSchema);