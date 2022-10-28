//Import packages
const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Location = require('./models/location');
//inital the database name
const Admin = require('./models/admin');
const User = require('./models/driver');
const VehicleType = require('./models/vehicleType');
const Vehicle = require('./models/vehicle');
const Warehouse = require('./models/warehouse');
const Path = require('./models/path');
const path = require("./models/path");

//Configure Express
const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.static("css"));
app.use(express.static('images'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


//Configure MongoDB
//const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/FIT3162";
//reference to the database (i.e. collection)
let msg = '';
var user;
var vehicleId;
//Connect to mongoDB server
mongoose.connect(url, function (err) {
        if (err) {
            console.log('Error in Mongoose connection');
            throw err;
        }
        console.log("DB Connected")
    }
)
//to check is login or not
let login = false;

//when access the inital page
app.get("/", function (req, res) {
    //define the path to redirect
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/login.html");
    }

});

//when access the frontpage
app.get("/frontPage", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/frontPage.html");
    }
});

//when access the loginpage 
app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/views/login.html");
});

//when access the delete admin apge 
app.get("/deleteAdmin", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/deleteAdmin.html");
    }
});

//when access the delete user page 
app.get("/deleteUser", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/deleteUser.html");
    }
});

//when access the delete vehicle page
app.get("/deleteVehicle", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/deleteVehicle.html");
    }
});

//when access the delete warehouse page
app.get("/deleteWarehouse", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/deleteWarehouse.html");
    }
});

//when access the delete vehicle page 
app.get("/deleteVehicle", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/deleteVehicle.html");
    }
});

//when access the insert admin page
app.get("/insertAdmin", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/insertAdmin.html");
    }
});

//when access the insert user page
app.get("/insertUser", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/insertUser.html");
    }
});

//when access the insert vehicle page
app.get("/insertVehicle", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/insertVehicle.html");
    }
});

//when access the insert warehouse page
app.get("/insertWarehouse", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/insertWarehouse.html");
    }
});

//when access the update admin page
app.get("/updateAdmin", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/updateAdmin.html");
    }
});

//when access the update user page
app.get("/updateUser", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/updateUser.html");
    }
});

//when access the update vehicle page
app.get("/updateVehicle", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/updateVehicle.html");
    }
});

//when access the update warehouse page
app.get("/updateWarehouse", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/updateWarehouse.html");
    }
});

//when access the update vehicle page
app.get("/updateVehicle", function (req, res) {
    if (login === false) {
        res.sendFile(__dirname + "/views/login.html");
    } else {
        res.sendFile(__dirname + "/views/updateVehicle.html");
    }
});

//when access all the admin
app.get("/getAllAdmin", function (req, res) {
    if (login === false) {
        res.render("login")
    } else {
        Admin.find({}, function (err, docs) {
            // docs is an array
            console.log(docs);
            res.render("getAllAdmin", {adminList: docs});
        });
    }
});

//when access all the user
app.get("/getAllUser", function (req, res) {
    if (login === false) {
        res.render("login")       
    } else {
        User.find({}, function (err, docs) {
            // docs is an array
            res.render("getAllUser", {userList: docs});
        });
    }
});

//when access all the vehicle
app.get("/getAllVehicle", function (req, res) {
    if (login === false) {
        res.render("login")
    } else {
        Vehicle.find({}, function (err, docs) {
            // docs is an array
            console.log(docs);
            res.render("getAllVehicle", {vehicleList: docs});
        });
    }
});

//when driver login, display all the vehicle info
app.get("/driverLogin", function (req, res) {
    console.log("\n\n\nHELLO!!!\n\n\n")
    //display all the vehicle
    Vehicle.find({}, function (err, docs) {
        // docs is an array
        console.log(docs);
        res.render("driverLogin", {vehicleList: docs});
    });

});

//when access all the path
app.get("/getAllPath", function (req, res) {
    //inital variable 
    let vehicleList = [{typeName: ''}];
    let userList = [{name: ''}];
    let pathList = [{destination: '', origin: "", emmision: 0, pathLength: 0}];
    if (login === false) {
        res.render("login")        //res.sendFile(__dirname + "/views/login.html");
    } else {
        //find the path
        Path.find({}, function (err, docs) {
            if (err) {
                console.log(err);
            }
            //console.log(docs);
            pathList = docs;
            //make sure the path is valid, reset the path.
            if (docs.length > 0) {
                //pathList = [];
                userList = [];
                vehicleList = [];
            } else {
                res.render("getAllPath", {pathList: docs, vehicleList: vehicleList, userList: userList});
            }
            //get all the deatil of the path
            for (let k = 0; k < docs.length; k++) {
                //get the vehicle's detail
                Vehicle.find({"_id": docs[k].vehicle._id.toString()}, function (err, vehicle) {
                    if (err) {
                        console.log(err);
                        //msg = 'invalid path input';
                    }
                    //console.log(vehicle[0]);
                    vehicleList.push(vehicle[0]);
                    console.log(vehicleList);
                    //docs[k].vehicle = vehicle[0];
                    //get the user's detail
                    User.find({"_id": docs[k].user._id.toString()}, function (err, user) {
                        if (err) {
                            console.log(err);
                        }
                        let a = user[0];
                        userList.push(a);
                        //for testing
                        console.log(userList);
                        console.log(docs);
                        console.log(userList);
                        console.log(vehicleList);
                        if (k === docs.length - 1) {
                            console.log("this is path");
                            res.render("getAllPath", {pathList: docs, vehicleList: vehicleList, userList: userList});
                        }
                    });
                });
            }
        });
    }
});

//when listing all the warehouse 
app.get("/getAllWarehouse", function (req, res) {
    if (login === false) {
        res.render("login")
    } else {
        //listing all the warehouse
        Warehouse.find({}, function (err, docs) {
            // docs is an array
            res.render("getAllWarehouse", {warehouseList: docs});
        });
    }
});

//deal with the requrie for client for login
app.post("/login", function (req, res) {
    let loginDetails = req.body;
    //check the user enter the correct data
    Admin.find({"name": String(loginDetails.admitname),"passward": String(loginDetails.passward)}, function (err, docs) {
        console.log(docs)
        console.log(111)
        // docs is an array
        //if is not found in admin, find in the user
        if (String(docs) === "") {
            User.find({"name": String(loginDetails.admitname),"passward": String(loginDetails.passward)}, function (err, driverdocs) {
                console.log(333);
                console.log(driverdocs);
                //decide which places to go
                if (String(driverdocs) === "") {
                    console.log(444)
                    res.redirect('/login');
                } else {
                    user = driverdocs[0]; //Set the user
                    console.log(user)
                    res.redirect('/driverLogin');
                }
            })
        } else {
            console.log(222);
            login = true;
            res.render("frontPage");
        }
    });
});

//insert new admin in database
app.post("/insertAdmin", function (req, res) {
    //create a temp variable
    let adminDetails = req.body;
    let admin1 = new Admin({
        _id: new mongoose.Types.ObjectId(),
        name: adminDetails.name,
        password: adminDetails.password
    })
    console.log(admin1)
    //push it to the server and redirect to get all admin
    admin1.save(function (err) {
        if (err) {
            console.log(err);
            msg = 'invalid admin input';
        } else {
            console.log('admin1 successfully Added to DB');
            res.redirect("/getAllAdmin");
        }
    });

});

//insert new user in database
app.post("/insertUser", function (req, res) {
    //inital new user
    let userDetails = req.body;
    console.log(req.body);
    if (userDetails.birthDay === '') {
        userDetails.birthDay = undefined;
    }
    let user1 = new User({
        _id: new mongoose.Types.ObjectId(),
        name: userDetails.name,
        birthDay: userDetails.birthDay,
        address: {
            state: userDetails.state,
            suburb: userDetails.suburb,
            street: userDetails.street,
            unit: userDetails.unit
        },
        phone: userDetails.phone,
        password: userDetails.passward
    })
    //push user in database, and redirect to get all user
    user1.save(function (err) {
        if (err) {
            console.log(err);
            msg = 'invalid doctor input';
        } else {
            res.redirect("/getAllUser");
        }
    });
});

//insert new vehicle in database
app.post("/insertVehicle", function (req, res) {
    //inital the variable
    let vehicleDetails = req.body;
    let vehicle1 = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        typeName: vehicleDetails.typeName,
        typeGasCost: vehicleDetails.typeGasCost,
        displacement: vehicleDetails.displacement,
        emmsionCreate: vehicleDetails.emmsionCreate
    })
    //push data to server, redirect to get all vehicle
    vehicle1.save(function (err) {
        if (err) {
            console.log(err);
            msg = 'invalid doctor input';
        } else {
            res.redirect('getAllVehicle')
        }
    });
});

//insert new warehouse in database
app.post("/insertWarehouse", function (req, res) {
    //inital the variable
    let warehouseDetails = req.body;
    let warehouse1 = new Warehouse({
        _id: new mongoose.Types.ObjectId(),
        type: warehouseDetails.warehouse,
        name: warehouseDetails.name
    })
    //push data to server and redirct to get all warehouse
    warehouse1.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('getAllWarehouse')
    });
});

//update the user base on the input from client
app.post('/updateUser', function (req, res) {
    let userdetail = req.body;
    //find the user first
    User.findByIdAndUpdate({_id: userdetail.id}, {
        //change data
        address: {
            state: userdetail.state,
            state: userdetail.state, suburb: userdetail.suburb,
            street: userdetail.street,
            unit: userdetail.unit
        },
        phone: userdetail.phone,
        password: userdetail.password,

    }, function (err, result) {
    })
    res.redirect('getAllUser')
})

//update the admin base on the input from client
app.post('/updateAdmin', function (req, res) {
    let admindetail = req.body;
    //find the admin first
    Admin.findByIdAndUpdate({_id: admindetail.id}, {
        //change data
            name: admindetail.name,
            password: admindetail.password
        },
        function (ree, result) {
        })
    res.redirect('getAllAdmin')
})

//update the warehouse base on the input from client
app.post('/updateWarehouse', function (req, res) {
    let warehousedetail = req.body;
    //find the warehouse first
    Warehouse.findByIdAndUpdate({_id: warehousedetail.id}, {
        //change data
            type: warehousedetail.type,
            name: warehousedetail.name
        },
        function (ree, result) {
        })
    res.redirect('getAllWarehouse')
})

////update the vehicle base on the input from client
app.post('/updateVehicle', function (req, res) {
    let vehicledetail = req.body;
    //find the vehicle first
    Vehicle.findByIdAndUpdate({_id: vehicledetail.id}, {
        //change data
            typeName: vehicledetail.typeName,
            typeGasCost: vehicledetail.typeGasCost,
            displacement: vehicledetail.displacement,
            emissionCreate: vehicledetail.emissionCreate
        },
        function (ree, result) {
        })
    res.redirect('getAllVehicle')
})

//delete the user base on the input ID
app.post('/deleteUser', function (req, res) {
    let userdetails = req.body
    User.deleteOne({_id: userdetails.id}, function (err, doc) {
    })
    res.redirect('getAllUser')
})

//delete the admin base on the input ID
app.post('/deleteAdmin', function (req, res) {
    let admindetails = req.body
    Admin.deleteOne({_id: admindetails.id}, function (err, doc) {
    })
    res.redirect('getAllAdmin')
})

//delete the warehouse base on the input ID
app.post('/deleteWarehouse', function (req, res) {
    let warehousedetails = req.body
    Warehouse.deleteOne({_id: warehousedetails.id}, function (err, doc) {
    })
    res.redirect('getAllWarehouse')
})

//delete the vehicle base on the input ID
app.post('/deleteVehicle', function (req, res) {
    let vehicledetails = req.body
    Vehicle.deleteOne({_id: vehicledetails.id}, function (err, doc) {
    })
    res.redirect('getAllVehicle')
})

//add route in the server
app.post("/addRoute", function (req, res) {
    //inital the variable
    let pathDetails = req.body;
    console.log(pathDetails)
    console.log("USER")
    console.log(user)
    console.log(vehicleId)
    console.log("Vehicle")
    //find the vehicle
    Vehicle.find({"_id": vehicleId}, function (err, vehicle) {
        //inital the path
        let path1 = new Path({
            _id: new mongoose.Types.ObjectId(),
            destination: pathDetails.destination,
            origin: pathDetails.origin,
            pathLength: (pathDetails.distance / 1000).toFixed(3),
            emmision: ((pathDetails.emission / 1000) * vehicle[0].typeGasCost).toFixed(3),
            user: user._id,
            vehicle: vehicleId._id,
        })
        //save the path into server
        path1.save(function (err) {
            if (err) {
                console.log(err);
                msg = 'invalid path input';
            }
        });
    });
    res.redirect('/close.html');
});

//respond for driver to select the vehicle
app.post("/selectVehicle", function (req, res) {
    //find the vehicle base on the id
    let selectId = req.body.selectVehicle.substring(0, req.body.selectVehicle.length - 1)
    Vehicle.findById({_id: selectId}, function (err, res) {
        vehicleId = res;
    })
    // console.log(user)
    res.redirect('/map.html');
})

//run the server that use port 8080
app.listen(8080, function () {
    console.log('App listening on port 8080!')
})