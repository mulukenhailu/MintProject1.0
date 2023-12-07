import axios from "axios";

export const getAllManagersApi = async () =>
  axios.get("/managers/all", { withCredentials: true });
