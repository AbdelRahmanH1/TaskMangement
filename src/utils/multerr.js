import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
export const uploadPhoto = () => {
  const fileValidation = {
    images: ["image/jpeg"],
  };
  const storage = diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      const id = nanoid();
      cb(null, `${id}--${file.originalname}`);
    },
  });
  const filter = (req, file, cb) => {
    if (!fileValidation.images.includes(file.mimetype)) {
      return cb(new Error("Invalid Format"), false);
    }
    return cb(null, true);
  };
  const upload = multer({ storage, fileFilter: filter });
  return upload;
};
