import axios from "axios";

export const getAllPendingRequestForStoreHeadApi = async () =>
  axios.get("/storehead/requestToApprove", { withCredentials: true });
export const getAllAcceptedRequestForStoreHeadApi = async () =>
  axios.get("/storehead/acceptedrequest", { withCredentials: true });
export const getAllDeclinedRequestForStoreHeadApi = async () =>
  axios.get("/storehead/rejectedrequest", { withCredentials: true });
