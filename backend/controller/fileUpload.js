const User = require("../model/auth");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const awsConfig = {
  apiVersion: process.env.AWS_API_VERSION,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
};

const s3 = new AWS.S3(awsConfig);

exports.uploadFile = async (req, res) => {
  try {
    const { base64String, fileName } = req.body;

    const buff = Buffer.from(base64String, "base64");

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${uuidv4()}.mp4`,
      Body: buff,
      ACL: "public-read",
      ContentType: "video/mp4",
    };
    console.log(params);
    const data = await s3
      .upload(params)
      .on("httpUploadProgress", (progress) => {
        console.log(progress);
        const percentage = (progress.loaded / progress.total) * 100;
        console.log("S3 Upload Progress:", percentage.toFixed(2) + "%");
      })
      .promise();
    res.json(data);
    // return;
    // const file = req.files.file;
    // console.log(file);

    // if (file.mimetype === "video/mp4") {
    //   const fileName = file.name;
    //   const parts = fileName.split(".");
    //   const extension = parts[parts.length - 1];

    //   const params = {
    //     Bucket: process.env.BUCKET_NAME,
    //     Key: `${uuidv4()}.${extension}`,
    //     Body: file.data,
    //     ACL: "public-read",
    //     ContentType: file.mimetype,
    //   };
    //   const data = await s3
    //     .upload(params)
    //     .on("httpUploadProgress", (progress) => {
    //       console.log("S3 Upload Progress:", progress);
    //     })
    //     .promise();

    //   console.log(data.Location);

    //   return res.json(data.Location);
    // }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Can't upload",
    });
  }
};
