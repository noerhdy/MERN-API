const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
// const productRoutes = require("./src/routes/product"); dummy (tidak dipakai)
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

//! [METHOD] untuk upload file
//? tempat dimana user menyimpan file storage
//?cb = callback
const fileStorage = multer.diskStorage({
  // letak folder/file
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  //? penamaan file
  //? ditambahkan timeStamps new Date().getTime() agar penamaan file tidak bentrok
  //? namun saya memakai new Date().toISOString().replace(/:/g, '-') penjelasannya ada di obsidian
  //? file.originalname = nama asli file yg dikirim
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

//! variabel baru untuk memfilter extensi file upload yg hanya menerima image
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//!MIDDLEWEAR
app.use(bodyParser.json()); // type JSON
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

//* GROUPING
// app.use("/v1/customer", productRoutes); dummy (tidak dipakai)
app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://hidayatnoer111:FMMMb4AW2S3sIy4P@cluster0.yksfuoq.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(4000, () => console.log("connection success"));
  })
  .catch((err) => console.log(err));
