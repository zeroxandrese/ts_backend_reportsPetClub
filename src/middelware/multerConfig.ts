import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Formato de archivo no permitido. Solo JPEG y PNG."));
    }
  },
});

export { upload };