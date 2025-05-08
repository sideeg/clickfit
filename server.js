const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Define the destination for uploads and create it if it doesn't exist
const UPLOAD_DIR = path.join(__dirname, "upload_images");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// Serve static files from the root directory (for index.html, css, js)
app.use(express.static(path.join(__dirname, "")));
// Serve uploaded images statically as well, so they can be displayed if needed
// This makes images in 'upload_images' accessible via '/upload_images/filename.ext'
app.use(
  "/upload_images",
  express.static(path.join(__dirname, "upload_images"))
);

// POST endpoint for image upload
app.post(
  "/upload",
  upload.single("uploadedImage"),
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or file type not supported." });
    }

    const filePath = `/upload_images/${req.file.filename}`;
    res.status(200).json({
      message: "File uploaded successfully!",
      filePath: filePath, // Send back the path to the uploaded file
    });
  },
  (error, req, res, next) => {
    // Multer error handling (e.g., file too large, wrong type based on filter)
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: error.message });
    }
    // Other errors
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    next();
  }
);

// Basic route for the root, serving index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
