// import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";

// cloudinary.config({
//   cloud_name: "blackhatmasuk",
//   api_key: "195999645862761",
//   api_secret: "06CNvIcoFyrnyc_fi_bLK8bKupM",
// });

// export const UploadFileToCloudinary = async (file) => {
//   try {
//     const res = await cloudinary.uploader.upload(file, {
//       resource_type: "auto",
//     });
//     return res;
//   } catch (error) {
//       console.log(error.message);
//       throw new Error('Failed to upload file to Cloudinary', error)
//   }
// };

// export const DeleteFileFromCloudinary = async (id) => {
//     try {
//         await cloudinary.uploader.destroy(id);
//     } catch (error) {
//       console.log(error.message);
//       throw new Error("Failed to delete file from Cloudinary", error);
//     }
// }

// export const upload = multer({dest: 'uploads/'})





import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "blackhatmasuk",
  api_key: "195999645862761",
  api_secret: "06CNvIcoFyrnyc_fi_bLK8bKupM",
});

// Multer configuration for memory storage
export const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as buffer
});

export const UploadFileToCloudinary = async (fileBuffer, fileName) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", public_id: fileName },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      uploadStream.end(fileBuffer); // Pass the file buffer to the upload stream
    });

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export const DeleteFileFromCloudinary = async (id) => {
  try {
    await cloudinary.uploader.destroy(id);
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to delete file from Cloudinary");
  }
};
