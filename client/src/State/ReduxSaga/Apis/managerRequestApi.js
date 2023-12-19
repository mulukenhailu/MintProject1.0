import axios from "axios";

const api = axios.create({
  withCredentials: true,
});
export const getAllPendingRequestForManagerApi = async () =>
  axios.get("/manager/requestToApprove", { withCredentials: true });
export const getAllAcceptedRequestForManagerApi = async () =>
  axios.get("/manager/acceptedrequest", { withCredentials: true });
export const getAllRejectedRequestForManagerApi = async () =>
  axios.get("/manager/rejectedrequest", { withCredentials: true });
export const acceptRequestForManagerApi = async (id) => {
  try {
    console.log(id);
    await api.post(`/manager/requestToApprove/${id}`);
  } catch (error) {
    console.error("Error:", error);
  }
};
export const declineRequestForManagerApi = async (request) => {
  axios.post(
    `/manager/rejectedrequest/${request.id}/${request.item_no}/${request.quantity_requested}`,
    { withCredentials: true }
  );
};
