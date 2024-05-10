const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file);
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 300);
    const fileExtension = "png";
    const newFilename =
      file.fieldname + "-" + uniqueSuffix + "." + fileExtension;
    const filePath = path.join(__dirname, "upload", newFilename);
    cb(null, newFilename, filePath);
  },
});

const upload = multer({ storage: storage });

const uploadFile = (req, res, next) => {
  const singleUpload = upload.single("image");

  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = uploadFile;
