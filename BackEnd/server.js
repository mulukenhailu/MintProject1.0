require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const userInfo = require("./handler/common/userInfo");
const filterByName = require("./handler/common/filterByName");
const updateProfile = require("./handler/common/updateProfile");
const register = require("./handler/Admin/registerUser");
const login = require("./handler/common/login");
const confirmOldPassword=require("./handler/common/confirmOldPassword")
const resetPassword = require("./handler/common/resetPassword");


const makeRequest = require("./handler/Employee/makeRequest");
const allNotifications = require("./handler/Employee/Notification/Allnotification");
const singleNotification = require("./handler/Employee/Notification/getNotification");
const allOrdersMade = require("./handler/Employee/AllRequest/allRequests");
const getupdateOfViwedNotificaion = require("./handler/Employee/Notification/updateNotifications");

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

const getAllUser = require("./handler/common/getAllUser");
const managerMakeRequest=require("./handler/manager/makeRequest/makeRequest")
const allManagersAvailable = require("./handler/manager/allManageravailable");
const manageracceptance = require("./handler/manager/acceptedRequest/acceptedRequest");
const managerOwnRequest=require("./handler/manager/ownPastRequest/ownPastRequest")

const managerDeclines = require("./handler/Employee/Rejected.js/rejectedByManager/rejectedByManager");
const managerReject = require("./handler/manager/rejectedRequest/rejectedRequest");

const storeHeadacceptance = require("./handler/storeHead/acceptedRequest");
const storeHeadRejectEmployeeReq = require("./handler/storeHead/rejectRequest");
const storeheadRejection = require("./handler/storeHead/allRejectedRequests");

const validateRequestForStoreKeeper = require("./handler/storeKeeper/storeKeeperBlessing");
const transactions = require("./handler/storeKeeper/pastTransaction");
const updateItem = require("./handler/item/updateItem")

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

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/public/assets/images"));

app.get("/welcome", (req, res) => {
  res.send("welcome");
});

app.post("/login", login.login);

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

app.post(
  "/oldpassword/confirm",
  verifyAccessToken.verifyAccessToken,
  confirmOldPassword.confirmOldPassword
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

app.get(
  "/notification/:notifyId",
  verifyAccessToken.verifyAccessToken,
  singleNotification.getNotification
);

app.get(
  "/employee/notifications",
  verifyAccessToken.verifyAccessToken,
  allNotifications.getAllNotification
);

app.get(
  "/employee/notifications/update/:notify_id",
  verifyAccessToken.verifyAccessToken,
  getupdateOfViwedNotificaion.getupdateOfViwedNotificaion
);

app.get(
  "/employee/orders",
  verifyAccessToken.verifyAccessToken,
  allOrdersMade.getAllRequestMade
);

app.post("/getuserinfo/:username", userInfo.userInfo);

app.post("/register", verifyAccessToken.verifyAccessToken, register.register);

app.post(
  "/manager/makeRequest",
  verifyAccessToken.verifyAccessToken,
  managerMakeRequest.managerMakeRequest
);

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
  "/manager/rejectrequest/:id/:item_no/:quantity_requested",
  verifyAccessToken.verifyAccessToken,
  managerReject.managerRejectRequest
);

app.get(
  "/manager/rejectedrequest",
  verifyAccessToken.verifyAccessToken,
  managerDeclines.EmployeesManagerRejectedRequest
);


app.get(
  "/manager/pastrequest",
  verifyAccessToken.verifyAccessToken,
  managerOwnRequest.managerPastRequest
);

app.get(
  "/storehead/acceptedrequest",
  verifyAccessToken.verifyAccessToken,
  storeHeadacceptance.acceptance
);

app.get(
  "/storehead/rejectedrequest",
  verifyAccessToken.verifyAccessToken,
  storeheadRejection.storeHeadRejection
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

app.post(
  "/storekeeper/blessing/:id/:confirmation_number",
  verifyAccessToken.verifyAccessToken,
  validateRequestForStoreKeeper.RequestForTheStoreKeeper
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

app.get(
  "/storekeeper/getallitem/:status",
  verifyAccessToken.verifyAccessToken,
  getAllItem.getAllItem
);
app.post(
  "/storekeeper/delete/:itemNo",
  verifyAccessToken.verifyAccessToken,
  deleteItem.deleteItem
);

app.get(
  "/storekeeper/transactions",
  verifyAccessToken.verifyAccessToken,
  transactions.history
);

app.post(
  "/storekeeper/createitem", 
  verifyAccessToken.verifyAccessToken,
  createItem.createItem
  );

app.post(
  "/storekeeper/updateItem", 
  verifyAccessToken.verifyAccessToken,
  updateItem.generalUpdate
)


const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(req);
    cb(null, path.join(__dirname, "./public/assets/images"));
  },
  filename(req, file, cb) {
    console.log(req);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send(`${req.file.filename}`);
});


app.listen(process.env.PORT || PORT, () => {
  console.log(`server started on port ${PORT}`);
});
