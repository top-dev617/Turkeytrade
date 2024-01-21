const multer = require("multer");
const fs = require("fs");
const path = require("path");

const isVideoFile = function (file) {
  const allowedExtensions = [".mkv", ".mp4"];
  const ext = path.extname(file.originalname);
  return allowedExtensions.includes(ext);
};

const isImageFile = function (file) {
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif"];
  const ext = path.extname(file.originalname);
  return allowedExtensions.includes(ext);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir;

    if (isVideoFile(file)) {
     // uploadDir = "public/videos";
     uploadDir = "/opt/turkeytrademarket/public/videos";

    } else if (isImageFile(file)) {
      //uploadDir = "public/images";
      uploadDir = "/opt/turkeytrademarket/public/images";

    } else {
      return cb(new Error("Invalid file type"));
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 50 MB limit
  },
});

// Middleware for handling Multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "Multer error: " + err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }

  next();
};

module.exports = {
  upload,
  handleMulterError,
};
