import axios from "axios";

export const getAllPendingRequestForStoreKeeperApi = async () =>
  axios.get("/storekeeper/requestTobless", { withCredentials: true });
export const getAllAcceptedRequestForStoreKeeperApi = async () =>
  axios.get("/storekeeper/transactions", { withCredentials: true });
