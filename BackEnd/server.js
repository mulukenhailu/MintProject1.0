require("dotenv").config();
const express = require("express");
const bodyParser= require("body-parser");
const filterByName=require("./handler/common/filterByName");
const updateProfile=require("./handler/common/updateProfile");
const makeRequest=require("./handler/Employee/makeRequest");
const register=require("./handler/Admin/registerUser")
const login=require("./handler/common/login")
const common=require("./handler/common/allitemAvailable");
const requestToApprove=require("./handler/manager/requestToApprove");
const verifyAccessToken=require("./middleware/verifyAccessToken")
const approveRequest=require("./handler/manager/approveRequest")
const cookieParser = require('cookie-parser')


// const validateapproval=require("./utility/Auth/validateRequest")

// const hasuraCloud=require("./utility/hasuraCloud")dot
// const itemByItemNumber=require("./utility/common/itemByItemNumber");
// const  managerByusername = require("./utility/common/managerByusername");



PORT=5000;
const app=express();
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.post("/register", register.register);
app.post("/login", login.login);
app.get("/getallitem", verifyAccessToken.verifyAccessToken, common.getAllItems);
app.post("/updateprofile", verifyAccessToken.verifyAccessToken, updateProfile.updateProfile);
app.post("/filterbyname", verifyAccessToken.verifyAccessToken, filterByName.filterByName);
app.post("/makerequest", verifyAccessToken.verifyAccessToken, makeRequest.makeRequest);
app.get("/manager/requestToApprove", verifyAccessToken.verifyAccessToken, requestToApprove.requestToApprove)
app.get("/manager/requestToApprove/:id", approveRequest.approveRequest)


// validateapproval.validateApproval("8ca8ad8e-3dc5-422b-bdbf-5b4f9bdc898e");

// hasuraCloud.test()
// itemByItemNumber.itemByItemNumber(1, "11");
// managerByusername.managerByusername("man10");

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server started on port ${PORT}`)
});