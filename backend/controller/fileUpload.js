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

    const buff = Buffer.from(base64String, "base64").toString();
    console.log(buff);
    res.json(buff);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Can't upload",
    });
  }
};
