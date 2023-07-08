import axios from "axios";

export const fileUploadFunction = async (file) => {
  return await axios.post(`http://localhost:5000/api/uploadFile`, file, {
    onUploadProgress: (progressData) => {
      console.log(progressData);
    },
  });
};
