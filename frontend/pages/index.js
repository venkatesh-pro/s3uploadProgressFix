import axios from "axios";
import React from "react";
import { fileUploadFunction } from "../function/fileUpload";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  const handleUploadFile = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await fileUploadFunction(formData);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Upload file</h1>
      <input accept="video/*" type="file" onChange={handleUploadFile} />
    </div>
  );
};

export default index;
