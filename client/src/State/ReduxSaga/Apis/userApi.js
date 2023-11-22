import axios from "axios";

export const createUserApi = async (user) =>
  axios.post("/register", user, { withCredentials: true });
export const loginApi = async (user) =>
  axios.post("/login", user, { withCredentials: true });
export const getSingleUserApi = async (user_name) =>
  axios.post(`/getuserinfo/${user_name}`);
export const getAllUserApi = async () => axios.get("/user");
export const editUserApi = async (newUser) =>
  axios.post("/updateprofile", newUser, { withCredentials: true });
export const editUserByAdminApi = async (newUser) =>
  axios.post("/adminupdateprofile", newUser, { withCredentials: true });
export const deleteUserApi = async (id) => axios.delete(`/test/${id}`);
