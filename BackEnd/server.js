require("dotenv").config();
const express = require("express");
const bodyParser= require("body-parser");

const filterByName=require("./handler/common/filterByName");
const updateProfile=require("./handler/common/updateProfile");
const makeRequest=require("./handler/Employee/makeRequest");
const register=require("./handler/Admin/registerUser");
const login=require("./handler/common/login");
const resetPassword=require("./handler/common/resetPassword");

const requestToApprove=require("./handler/manager/requestToApprove");
const verifyAccessToken=require("./middleware/verifyAccessToken");
const approveRequest=require("./handler/manager/approveRequest");
const requestToApproveStoreHead=require("./handler/storeHead/requestToApprove");
const approveRequestByStoreHead=require("./handler/storeHead/approveRequest");
const requestTobeBlessed=require("./handler/storeKeeper/requestTobeBlessed");

const getAllItem=require("./handler/item/getAllItem");
const getItem=require("./handler/item/getItem");
const deleteItem=require("./handler/item/deleteItem");

const createItem=require("./handler/item/createItem");

const allManagersAvailable=require("./handler/manager/allManageravailable")
const acceptance=require("./handler/manager/acceptedRequest")
const getAllUser=require("./handler/common/getAllUser")





const credentials=require("./middleware/credentials")

const cookieParser = require('cookie-parser');

const cors=require("cors");


const userInfo=require("./handler/common/userInfo");


const adminupdateProfile=require("./handler/Admin/adminUpdateProfile");


// const corsOptions = {
//     credentials: true
// };

var whitelist = ['http://localhost:3001', 'http://localhost:3000', 'https://mint-s0j6.onrender.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}


PORT=3001;
const app=express();



app.use(cookieParser())

app.use(credentials)
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


app.post("/login", login.login);
app.get("/getallitem", verifyAccessToken.verifyAccessToken, getAllItem.getAllItem);
app.post("/updateprofile", verifyAccessToken.verifyAccessToken, updateProfile.updateProfile);
app.post("/filterbyname", verifyAccessToken.verifyAccessToken, filterByName.filterByName);
app.post("/resetpassword", verifyAccessToken.verifyAccessToken, resetPassword.resetPassword);

app.get("/user", getAllUser.getAllUser);

app.post("/adminupdateprofile", verifyAccessToken.verifyAccessToken, adminupdateProfile.adminupdateProfile);

app.post("/makerequest", verifyAccessToken.verifyAccessToken, makeRequest.makeRequest);
app.post("/getuserinfo/:username", userInfo.userInfo);

app.post("/register", verifyAccessToken.verifyAccessToken, register.register);


app.get("/managers/all", verifyAccessToken.verifyAccessToken, allManagersAvailable.allManagersAvailable)
app.post("/manager/requestToApprove", verifyAccessToken.verifyAccessToken, requestToApprove.requestToApprove);
app.post("/manager/requestToApprove/:id", verifyAccessToken.verifyAccessToken, approveRequest.approveRequest);
app.get("/manager/acceptedrequest", verifyAccessToken.verifyAccessToken, acceptance.acceptance)

app.post("/storehead/requestToApprove", verifyAccessToken.verifyAccessToken, requestToApproveStoreHead.requestToApproveStoreHead);
app.post("/storehead/requestToApprove/:id", verifyAccessToken.verifyAccessToken, approveRequestByStoreHead.approveRequestByStoreHead);

app.post("/storekeeper/requestTobless", verifyAccessToken.verifyAccessToken, requestTobeBlessed.requestTobeBlessed);
app.get("/storekeeper/getitem/:itemNo", verifyAccessToken.verifyAccessToken, getItem.getItem);
app.post("/storekeeper/delete/:itemNo", verifyAccessToken.verifyAccessToken, deleteItem.deleteItem);

app.post("/createitem", createItem.createItem)


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server started on port ${PORT}`)
});
