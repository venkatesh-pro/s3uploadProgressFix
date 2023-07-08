const express = require("express");
const { uploadFile, sendMessage } = require("../controller/fileUpload.js");
const fileUpload = require("express-fileupload");

const router = express.Router();

router.post("/uploadFile", fileUpload(), uploadFile);

module.exports = router;
