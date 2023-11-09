const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/videos";

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
  fileFilter: function (req, file, cb) {
    const allowedExtensions = [".mkv", ".mp4"];
    const ext = path.extname(file.originalname);

    if (!allowedExtensions.includes(ext)) {
      return cb(
        new Error("Only videos with .mkv and .mp4 extensions are allowed!")
      );
    }

    cb(null, true);
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
