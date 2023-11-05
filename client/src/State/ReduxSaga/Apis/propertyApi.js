import axios from "axios";

export const createPropertyApi = async (property) => axios.post("", property);
export const getAllPropertiesApi = async () => axios.get("/getallitem");
export const editPropertyApi = async ({ id, newProperty }) =>
  axios.patch(`/test/${id}`, newProperty);
export const deletePropertyApi = async (id) => axios.delete(`/test/${id}`);
