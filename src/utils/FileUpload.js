import multer from "multer";
import { ErrorMessage } from "./ErrorMessage.js";

let setting = () => {
  const storage = multer.diskStorage({});
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      return cb(null, true);
    } else {
      cb(ErrorMessage(400, "Images only!"), false);
    }
  };
  return multer({
    storage,
    fileFilter,
  });
};
let settingVideo = () => {
  const storage = multer.diskStorage({});
  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(mp4|mpeg|avi|mkv)$/)) {
      return cb(ErrorMessage(400, "Only video files are allowed!"), false);
    }
    cb(null, true);
  };
  return multer({
    storage,
    fileFilter,
  });
};

export const uploadSingleFile = (fieldName) => {
  return setting().single(fieldName);
};
export const uploadSingleVideo = (fieldName) => {
  return settingVideo().single(fieldName);
};

export const uploadMixFile = (arrayOfFields, folderName) => {
  return setting(folderName).fields(arrayOfFields);
};
