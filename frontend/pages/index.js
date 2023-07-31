import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

const index = () => {
  const router = useRouter();
  const [progress, setProgress] = useState();

  const handleUploadFile = async (e) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64String = reader.result.split("base64,")[1];

        console.log(base64String);

        const dataInfo = {
          base64String: base64String,
          fileName: file.name,
        };
        const { data } = await axios.post(
          `http://localhost:5000/api/uploadFile`,
          dataInfo,
          {
            onUploadProgress: (ndata) => {
              const { loaded, total } = ndata;

              setProgress(Math.round((100 * loaded) / total));
              console.log(Math.round((100 * loaded) / total));
            },
          }
        );
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Upload file</h1>
      <input type="file" onChange={handleUploadFile} />
      {progress && <span>{`${progress}%`}</span>}
    </div>
  );
};

export default index;
