//Import packages
const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const morgan = require("morgan");

const Location = require('./models/location');
const Admin = require('./models/admin');
const User = require('./models/driver');
const VehicleType = require('./models/vehicleType');

const Vehicle = require('./models/vehicle');
const Warehouse = require('./models/warehouse');
const Path = require('./models/path');


const ejs = require("ejs");
//Configure Express
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));




//Configure MongoDB
const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/FIT3162";
//reference to the database (i.e. collection)
let db;
mongoose.connect(url,function(err){
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log("DB Connected")
    }
)


app.get("/", function (req, res) {
    //inital the admin 
    let admin1 =  new Admin ({
        _id: new mongoose.Types.ObjectId(),
        name:"admin",
        password: "admin"
    })
    console.log(admin1)
    admin1.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    //inital the user
    let user1 =  new User ({
        _id: new mongoose.Types.ObjectId(),
        name:"Haolin",
        birthDay:undefined,
        address: {
            state: "VIC",
            suburb: "Clayton",
            street: "123 grand street",
            unit: "unit 3"
        },
        phone: "778-960-8996",
        password: "user"
    })
    user1.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    let user2 =  new User ({
        _id: new mongoose.Types.ObjectId(),
        name:"Yuchen",
        birthDay:undefined,
        address: {
            state: "VIC",
            suburb: "Clayton",
            street: "123 grand street",
            unit: "unit 4"
        },
        phone: "778-960-8997",
        password: "user"
    })
    user2.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    let user3 =  new User ({
        _id: new mongoose.Types.ObjectId(),
        name:"Jiahao",
        birthDay:undefined,
        address: {
            state: "VIC",
            suburb: "Clayton",
            street: "123 grand street",
            unit: "unit 4"
        },
        phone: "778-960-8998",
        password: "user"
    })
    user3.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    let user4 =  new User ({
        _id: new mongoose.Types.ObjectId(),
        name:"Runzhe",
        birthDay:undefined,
        address: {
            state: "VIC",
            suburb: "Clayton",
            street: "123 grand street",
            unit: "unit 3"
        },
        phone: "778-960-8999",
        password: "user"
    })
    user4.save(function (err) {
        if (err) {
            console.log(err);
        }

    });

    //inital the vehicle
    let vehicleType1 =  new Vehicle ({
        _id: new mongoose.Types.ObjectId(),
        typeName:"heavy-duty truck",
        typeGasCost:30,
        displacement:16,
        emmsionCreate:95
        
    })
    vehicleType1.save(function (err) {
        if (err) {
            console.log(err);
        }
    });

    let vehicleType2 =  new Vehicle ({
        _id: new mongoose.Types.ObjectId(),
        typeName:"Multi-stop truck",
        typeGasCost:28.9,
        displacement:4.8,
        emmsionCreate:98
        
    })
    vehicleType2.save(function (err) {
        if (err) {
            console.log(err);
        }
    });

    let vehicleType3 =  new Vehicle ({
        _id: new mongoose.Types.ObjectId(),
        typeName:"Isuzu ELF",
        typeGasCost:24.1,
        displacement:2.7,
        emmsionCreate:98
        
    })
    vehicleType3.save(function (err) {
        if (err) {
            console.log(err);
        }
    });

    let vehicleType4 =  new Vehicle ({
        _id: new mongoose.Types.ObjectId(),
        typeName:"Isuzu Reach truck",
        typeGasCost:20.6,
        displacement:3.1,
        emmsionCreate:92
    })
    vehicleType4.save(function (err) {
        if (err) {
            console.log(err);
        }
    });



});


app.listen(8080);