import axios from "axios";

export const fileUploadFunction = async (file) => {
  return await axios.post(`http://localhost:5000/api/uploadFile`, file, {
    onUploadProgress: (progress) => {
      const { loaded, total } = progress;
      const percentCompleted = Math.round((loaded * 100) / total);
      console.log("Upload progress:", percentCompleted);
    },
  });
};
