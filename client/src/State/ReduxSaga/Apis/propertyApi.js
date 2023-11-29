import axios from "axios";

export const createPropertyApi = async (property) =>
  axios.post("/createitem", property, { withCredentials: true });
export const getAllPropertiesApi = async () =>
  axios.get("/getallitem", { withCredentials: true });
export const editPropertyApi = async ({ id, newProperty }) =>
  axios.patch(`/test/${id}`, newProperty);
export const deletePropertyApi = async (id) => axios.delete(`/test/${id}`);
