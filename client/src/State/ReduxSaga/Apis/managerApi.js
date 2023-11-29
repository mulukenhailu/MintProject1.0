import axios from "axios";

export const getAllManagersApi = async () => {
  console.log("test");
  axios.get("/managers/all", { withCredentials: true });
};
