import axios from "axios";

export const getAllPendingRequestForStoreHeadApi = async () =>
  axios.get("/storehead/requestToApprove", { withCredentials: true });
export const getAllSAcceptedRequestForStoreHeadApi = async () =>
  axios.get("/storehead/acceptedrequest", { withCredentials: true });
