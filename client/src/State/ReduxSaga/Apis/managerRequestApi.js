import axios from "axios";

export const getAllPendingRequestForManagerApi = async () =>
  axios.get("/manager/requestToApprove", { withCredentials: true });
export const getAllSAcceptedRequestForManagerApi = async () =>
  axios.get("/manager/acceptedrequest", { withCredentials: true });
