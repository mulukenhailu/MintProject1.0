import axios from "axios";

export const createOrderApi = async (order) =>
  axios.post("/makerequest", order, { withCredentials: true });
export const getAllOrderApi = async () =>
  axios.get("/getallorder", { withCredentials: true });
export const editOrderApi = async ({ id, newOrder }) =>
  axios.patch(`/order/${id}`, newOrder, { withCredentials: true });
export const deleteOrderApi = async (id) =>
  axios.delete(`/test/${id}`, { withCredentials: true });
export const deleOrderApi = async (id) =>
  axios.delete(`/test/${id}`, { withCredentials: true });
