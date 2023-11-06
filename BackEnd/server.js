require("dotenv").config();
const express = require("express");
const bodyParser= require("body-parser");
const filterByName=require("./handler/common/filterByName");
const updateProfile=require("./handler/common/updateProfile");
const makeRequest=require("./handler/Employee/makeRequest");
const register=require("./handler/Admin/registerUser");
const login=require("./handler/common/login");
const resetPassword=require("./handler/common/resetPassword");
const common=require("./handler/common/allitemAvailable");
const requestToApprove=require("./handler/manager/requestToApprove");
const verifyAccessToken=require("./middleware/verifyAccessToken");
const approveRequest=require("./handler/manager/approveRequest");
const requestToApproveStoreHead=require("./handler/storeHead/requestToApprove");
const approveRequestByStoreHead=require("./handler/storeHead/approveRequest");
const requestTobeBlessed=require("./handler/storeKeeper/requestTobeBlessed");

const cookieParser = require('cookie-parser');

const cors=require("cors");


const corsOptions = {
    origin:'http://localhost:3000',
    credentials: true,
};


<<<<<<< HEAD
// const validateapproval=require("./utility/Auth/validateRequest")

// const hasuraCloud=require("./utility/hasuraCloud")dot
// const itemByItemNumber=require("./utility/common/itemByItemNumber");
// const  managerByusername = require("./utility/common/managerByusername");


=======
>>>>>>> 5f1091856a18e693c92999b538410f1e08ca9b40

PORT=3001;
const app=express();
app.use(cookieParser())

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


app.post("/login", login.login);
app.get("/getallitem", verifyAccessToken.verifyAccessToken, common.getAllItems);

app.post("/updateprofile", verifyAccessToken.verifyAccessToken, updateProfile.updateProfile);
app.post("/filterbyname", verifyAccessToken.verifyAccessToken, filterByName.filterByName);
app.post("/resetpassword", verifyAccessToken.verifyAccessToken, resetPassword.resetPassword);
app.post("/makerequest", verifyAccessToken.verifyAccessToken, makeRequest.makeRequest);

app.post("/register", verifyAccessToken.verifyAccessToken, register.register);

app.post("/manager/requestToApprove", verifyAccessToken.verifyAccessToken, requestToApprove.requestToApprove);
app.post("/manager/requestToApprove/:id", verifyAccessToken.verifyAccessToken, approveRequest.approveRequest);

app.post("/storehead/requestToApprove", verifyAccessToken.verifyAccessToken, requestToApproveStoreHead.requestToApproveStoreHead);
app.post("/storehead/requestToApprove/:id", verifyAccessToken.verifyAccessToken, approveRequestByStoreHead.approveRequestByStoreHead);

app.post("/storekeeper/requestTobless", verifyAccessToken.verifyAccessToken, requestTobeBlessed.requestTobeBlessed);


<<<<<<< HEAD
// hasuraCloud.test()
// itemByItemNumber.itemByItemNumber(1, "11");
// managerByusername.managerByusername("man10");

// addApprovalByManager.addApprovalByManager()
=======
>>>>>>> 5f1091856a18e693c92999b538410f1e08ca9b40

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server started on port ${PORT}`)
});
