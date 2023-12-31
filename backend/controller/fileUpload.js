const User = require("../model/auth");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const awsConfig = {
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
};

const s3 = new AWS.S3(awsConfig);

exports.uploadFile = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);

    if (file.mimetype === "video/mp4") {
      const fileName = file.name;
      const parts = fileName.split(".");
      const extension = parts[parts.length - 1];

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${uuidv4()}.${extension}`,
        Body: file.data,
        ACL: "public-read",
        ContentEncoding: "7bit",
        ContentType: file.mimetype,
      };
      const data = await s3
        .upload(params)
        .on("httpUploadProgress", (progress) => {
          console.log("S3 Upload Progress:", progress);
        })
        .promise();

      console.log(data.Location);

      return res.json(data.Location);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Can't upload",
    });
  }
};
