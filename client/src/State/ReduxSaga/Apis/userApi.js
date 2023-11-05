import axios from "axios";

export const createUserApi = async (user) => axios.post("/register", user, {withCredentials:true});
export const loginApi = async (user) => axios.post("/login", user, {withCredentials:true});
export const getAllUserApi = async () => axios.get("");
export const editUserApi = async (id, newUser) => axios.patch(`/test/${id}`, newUser)
export const deleteUserApi = async(id) => axios.delete(`/test/${id}`)
