// require("dotenv").config();
// const express = require("express");
// const bodyParser= require("body-parser");

// const filterByName=require("./handler/common/filterByName");
// const updateProfile=require("./handler/common/updateProfile");
// const makeRequest=require("./handler/Employee/makeRequest");
// const register=require("./handler/Admin/registerUser");
// const login=require("./handler/common/login");
// const resetPassword=require("./handler/common/resetPassword");

// const requestToApprove=require("./handler/manager/requestToApprove");
// const verifyAccessToken=require("./middleware/verifyAccessToken");
// const approveRequest=require("./handler/manager/approveRequest");
// const requestToApproveStoreHead=require("./handler/storeHead/requestToApprove");
// const approveRequestByStoreHead=require("./handler/storeHead/approveRequest");
// const requestTobeBlessed=require("./handler/storeKeeper/requestTobeBlessed");

// const getAllItem=require("./handler/item/getAllItem");
// const getItem=require("./handler/item/getItem");
// const deleteItem=require("./handler/item/deleteItem");

// const createItem=require("./handler/item/createItem");

// const allManagersAvailable=require("./handler/manager/allManageravailable")
// const manageracceptance=require("./handler/manager/acceptedRequest")
// const getAllUser=require("./handler/common/getAllUser")

// const storeHeadacceptance=require("./handler/storeHead/acceptedRequest")

// // const upload=require("./utility/ImageUpload/configupload")
// // const uploadfunc=require("./utility/ImageUpload/imageupload")

// const path = require("path");
// const multer = require("multer");







// const credentials=require("./middleware/credentials")

// const cookieParser = require('cookie-parser');

// const cors=require("cors");


// const userInfo=require("./handler/common/userInfo");


// const adminupdateProfile=require("./handler/Admin/adminUpdateProfile");


// // const corsOptions = {
// //     credentials: true
// // };

// // var whitelist = ['http://localhost:3001', 'http://localhost:3000', 'https://mint-s0j6.onrender.com', "https://mint-s0j6.onrender.com/uploads"]
// // var corsOptions = {
// //   origin: function (origin, callback) {
// //     if (whitelist.indexOf(origin) !== -1) {
// //       callback(null, true)
// //     } else {
// //       callback(new Error('Not allowed by CORS'))
// //     }
// //   },
// //   credentials: true
// // }


// PORT=3001;
// const app=express();



// app.use(cookieParser())

// app.use(credentials)
// // app.use(cors(corsOptions));
// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json());

// app.use(express.static('/public'));
// app.use('/uploads', express.static(__dirname + '/public/assets/images'));

// app.get("/welcome", (req, res)=>{
//     res.send("welcome")
// })


// app.post("/login", login.login);
// app.get("/getallitem", verifyAccessToken.verifyAccessToken, getAllItem.getAllItem);
// app.post("/updateprofile", verifyAccessToken.verifyAccessToken, updateProfile.updateProfile);
// app.post("/filterbyname", verifyAccessToken.verifyAccessToken, filterByName.filterByName);
// app.post("/resetpassword", verifyAccessToken.verifyAccessToken, resetPassword.resetPassword);

// app.get("/user", getAllUser.getAllUser);

// app.post("/adminupdateprofile", verifyAccessToken.verifyAccessToken, adminupdateProfile.adminupdateProfile);

// app.post("/makerequest", verifyAccessToken.verifyAccessToken, makeRequest.makeRequest);
// app.post("/getuserinfo/:username", userInfo.userInfo);

// app.post("/register", verifyAccessToken.verifyAccessToken, register.register);


// app.get("/managers/all", verifyAccessToken.verifyAccessToken, allManagersAvailable.allManagersAvailable)
// app.get("/manager/requestToApprove", verifyAccessToken.verifyAccessToken, requestToApprove.requestToApprove);
// app.post("/manager/requestToApprove/:id", verifyAccessToken.verifyAccessToken, approveRequest.approveRequest);
// app.get("/manager/acceptedrequest", verifyAccessToken.verifyAccessToken, manageracceptance.acceptance)

// app.get("/storehead/acceptedrequest", verifyAccessToken.verifyAccessToken, storeHeadacceptance.acceptance)
// app.get("/storehead/requestToApprove", verifyAccessToken.verifyAccessToken, requestToApproveStoreHead.requestToApproveStoreHead);
// app.post("/storehead/requestToApprove/:id", verifyAccessToken.verifyAccessToken, approveRequestByStoreHead.approveRequestByStoreHead);

// app.get("/storekeeper/requestTobless", verifyAccessToken.verifyAccessToken, requestTobeBlessed.requestTobeBlessed);
// app.get("/storekeeper/getitem/:itemNo", verifyAccessToken.verifyAccessToken, getItem.getItem);
// app.post("/storekeeper/delete/:itemNo", verifyAccessToken.verifyAccessToken, deleteItem.deleteItem);

// app.post("/createitem", createItem.createItem)

// // app.post("/profile-upload-single", upload.single("image"), uploadfunc.uploadfunc)
// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, path.join(__dirname, "./public/assets/images"));
//     },
//     filename(req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage });
  
//   app.post("/upload", upload.single("image"), (req, res) => {
//     console.log(req.file);
//     res.send(req.file.filename);
//   });
  

// app.listen(process.env.PORT || PORT, ()=>{
//     console.log(`server started on port ${PORT}`)
// });
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const userInfo = require("./handler/common/userInfo");
const filterByName = require("./handler/common/filterByName");
const updateProfile = require("./handler/common/updateProfile");
const makeRequest = require("./handler/Employee/makeRequest");
const register = require("./handler/Admin/registerUser");
const login = require("./handler/common/login");
const resetPassword = require("./handler/common/resetPassword");

const requestToApprove = require("./handler/manager/pendingRequest/requestToApprove");
const verifyAccessToken = require("./middleware/verifyAccessToken");
const approveRequest = require("./handler/manager/approveRequest");
const storeHeadPendings = require("./handler/storeHead/requestToApprove");
const approveRequestByStoreHead = require("./handler/storeHead/approveRequest");
const requestTobeBlessed = require("./handler/storeKeeper/requestTobeBlessed");

const getAllItem = require("./handler/item/getAllItem");
const getItem = require("./handler/item/getItem");
const deleteItem = require("./handler/item/deleteItem");

const createItem = require("./handler/item/createItem");

const allManagersAvailable = require("./handler/manager/allManageravailable");
const manageracceptance = require("./handler/manager/acceptedRequest/acceptedRequest");
const getAllUser = require("./handler/common/getAllUser");
const managerDeclines =require("./handler/Employee/Rejected.js/rejectedByManager/rejectedByManager")
const managerReject=require("./handler/manager/rejectedRequest/rejectedRequest")

const storeHeadacceptance = require("./handler/storeHead/acceptedRequest");
const storeHeadRejectEmployeeReq=require("./handler/storeHead/rejectRequest")

const path = require("path");
const multer = require("multer");

const credentials = require("./middleware/credentials");

const cookieParser = require("cookie-parser");

const cors = require("cors");



const adminupdateProfile = require("./handler/Admin/adminUpdateProfile");


var whitelist = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://mint-s0j6.onrender.com",
  "http://localhost:3001/uploads",
];

const corsOptions = {
  origin: whitelist,
  credentials: true,
};

PORT = 3001;
const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));
app.use(credentials);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/uploads", express.static(__dirname + "/public/assets/images"));

app.get("/welcome", (req, res) => {
  res.send("welcome");
});

app.post("/login", login.login);
app.get(
  "/getallitem",
  verifyAccessToken.verifyAccessToken,
  getAllItem.getAllItem
);
app.post(
  "/updateprofile",
  verifyAccessToken.verifyAccessToken,
  updateProfile.updateProfile
);
app.post(
  "/filterbyname",
  verifyAccessToken.verifyAccessToken,
  filterByName.filterByName
);
app.post(
  "/resetpassword",
  verifyAccessToken.verifyAccessToken,
  resetPassword.resetPassword
);

app.get("/user", getAllUser.getAllUser);

app.post(
  "/adminupdateprofile",
  verifyAccessToken.verifyAccessToken,
  adminupdateProfile.adminupdateProfile
);

app.post(
  "/makerequest",
  verifyAccessToken.verifyAccessToken,
  makeRequest.makeRequest
);
app.post("/getuserinfo/:username", userInfo.userInfo);

app.post("/register", verifyAccessToken.verifyAccessToken, register.register);

app.get(
  "/managers/all",
  verifyAccessToken.verifyAccessToken,
  allManagersAvailable.allManagersAvailable
);
app.get(
  "/manager/requestToApprove",
  verifyAccessToken.verifyAccessToken,
  requestToApprove.requestToApprove
);
app.post(
  "/manager/requestToApprove/:id",
  verifyAccessToken.verifyAccessToken,
  approveRequest.approveRequest
);
app.get(
  "/manager/acceptedrequest",
  verifyAccessToken.verifyAccessToken,
  manageracceptance.acceptance
);

app.post(
  "/manager/rejectedrequest/:id/:item_no/:quantity_requested",
  verifyAccessToken.verifyAccessToken,
  managerReject.managerRejectRequest
);


app.get(
  "/manager/rejectedrequest",
  verifyAccessToken.verifyAccessToken,
  managerDeclines.EmployeesManagerRejectedRequest
);



app.get(
  "/storehead/acceptedrequest",
  verifyAccessToken.verifyAccessToken,
  storeHeadacceptance.acceptance
);
app.get(
  "/storehead/requestToApprove",
  verifyAccessToken.verifyAccessToken,
  storeHeadPendings.storeHeadPendings
);
app.post(
  "/storehead/requestToApprove/:id",
  verifyAccessToken.verifyAccessToken,
  approveRequestByStoreHead.approveRequestByStoreHead
);

app.post(
  "/storehead/rejectedrequest/:id/:item_no/:quantity_requested",
  verifyAccessToken.verifyAccessToken,
  storeHeadRejectEmployeeReq.storeHeadRejectEmployeeReq
);



app.get(
  "/storekeeper/requestTobless",
  verifyAccessToken.verifyAccessToken,
  requestTobeBlessed.requestTobeBlessed
);
app.get(
  "/storekeeper/getitem/:itemNo",
  verifyAccessToken.verifyAccessToken,
  getItem.getItem
);
app.post(
  "/storekeeper/delete/:itemNo",
  verifyAccessToken.verifyAccessToken,
  deleteItem.deleteItem
);

app.post("/createitem", createItem.createItem);


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "./public/assets/images"));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send(req.file.filename);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server started on port ${PORT}`);
});