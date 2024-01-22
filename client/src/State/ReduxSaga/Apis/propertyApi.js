import axios from "axios";

export const createPropertyApi = async (property) =>
  axios.post("/storekeeper/createitem", property, { withCredentials: true });
export const getAllPropertiesApi = async () =>
  axios.get("/storekeeper/getallitem/available", { withCredentials: true });
