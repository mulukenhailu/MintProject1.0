import axios from "axios";

export const uploadImageAPI = async (image) => {
  console.log(image);
  const formData = new FormData();
  formData.append("image", image);
  console.log(formData);

  return axios.post("/upload", formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
    withCredentials: true,
  });
};
