import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "blackhatmasuk",
  api_key: "195999645862761",
  api_secret: "06CNvIcoFyrnyc_fi_bLK8bKupM",
});

export const UploadFileToCloudinary = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
      console.log(error.message);
      throw new Error('Failed to upload file to Cloudinary', error)
  }
};

export const DeleteFileFromCloudinary = async (id) => {
    try {
        await cloudinary.uploader.destroy(id);
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to delete file from Cloudinary", error);
    }
}

export const upload = multer({dest: 'uploads/'})