// ازاي تكريت سيرفر باستخدام ال Express
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userModel = require("./user.schema");


const app = express();

const url = "mongodb+srv://mego:mego123mego@mego.5rz1lzg.mongodb.net/mego";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(url);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.log("Error while connect to mongo DB" + err);
    process.exit();
  }
};
connectDB();
app.use(bodyparser.json());


let Users = [];

// 1) get
app.get("/users", async function (req, res) {
  let allUsers = await userModel.find();
  res.json({ Users: allUsers, Status: 200 });
});

// ============================

// 2) post
app.post("/users", async function (req, res) {
  console.log(req.body);
  let { name, email, age, phone } = req.body;
  const User = {
    name: name,
    email: email,
    phone: phone,
    age: age,
  };
  let createdUser = await userModel.create(User);
  res.json({
    Massage: "Done User Added Succefully",
    status: 200,
    User: createdUser,
  });
});

// ============================

// 3) update / put
app.put("/users/:id", async function (req, res) {
  let payload = req.body;
  await userModel.findByIdAndUpdate(req.params.id, payload);
  res.json({ Massage: "User Updated Succefully", status: 200 });
});

// ============================

// 4) Delete
app.delete("/users/:id", async function (req, res) {
  await userModel.findByIdAndDelete(req.params.id);
  res.json({ Massage: "User Updated Succefully", status: 200 });
});

app.listen(8000);

// ==================
// (get orders )

// let Orders = [{id:"1", Price:"100", Discription:"Laptop"}]

// app.get("/Orders" , function(req,res){
//   res.json({Orders:Orders, Massage:"Done"})
// })

// code  midile were
// app.use(function(req,res,next){
//   console.log(" A New Request is Received at " + new Date().toISOString())
//   next();
// })

// app.get('/users/:id', function(req,res,next){
//   console.log(" done")
// res.json({name:"abdo",id:req.params.id })
// next()
// })

// app.use(function(req,res,next){
//   console.log(" A New Request is Ended at " + new Date().toISOString())
//   next();
// })

// ازاي تكريت سيرفر بطريقة نود جي اس
// const http = require('http');
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type' : 'text/html'});
//     res.end("Hello world again");
// }).listen(8080);

// ===================

// app.get('/users/:id', function(req,res){
//   res.json({name:"abdo",id:req.params.id })
// })
// app.get('/profile', function(req,res){
//   res.send("hello from Express profile " + req.query.name)
// })
// app.get('/search', function(req,res){
//   res.send("hello from Express Search about " + req.query.name)
// })
