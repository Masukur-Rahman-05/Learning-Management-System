// import {
//   UploadFileToCloudinary,
//   DeleteFileFromCloudinary,
// } from "../../helper/cloudinary.js";



// export const UploadCourseFile = async (req,res) => {
//   try {
//     const result = await UploadFileToCloudinary(req.file.path);

//     return res.status(201).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//       console.log(error.message)
//     throw new Error("Failed to upload file", error.message);
//   }
// };

// export const DeleteCourseFile = async (req, res) => {

//     const { id } = req.params;

//     if (!id) {
//         return res.status(400).json({
//             success: false,
//             message: "File Not found!Please provide a valid id",
//         })
//     }
//     try {

//         await DeleteFileFromCloudinary(id);

//         return res.status(200).json({
//             success: true,
//             message: "File deleted successfully",
//         })
        
//     } catch (error) {
//         console.log(error.message);
//         throw new Error("Failed to delete file", error.message);
//     }
// }


// //.......................................................UploadMultiple Files


// export const UploadBulkFiles = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No files provided!",
//       });
//     }

//     const uploadPromises = req.files.map((file) =>
//       UploadFileToCloudinary(file.path)
//     );

//     const results = await Promise.all(uploadPromises);

//     return res.status(201).json({
//       success: true,
//       data: results,
//     });
//   } catch (error) {
//     console.log(error.message);
//     throw new Error("Failed to upload files", error.message);
//   }
// };







import {
  UploadFileToCloudinary,
  DeleteFileFromCloudinary,
} from "../../helper/cloudinary.js";

// Single file upload
export const UploadCourseFile = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "No file provided or file buffer is missing",
      });
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    const result = await UploadFileToCloudinary(fileBuffer, fileName);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("File upload error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to upload file",
      error: error.message,
    });
  }
};

// Bulk file upload
export const UploadBulkFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files provided",
      });
    }

    const uploadPromises = req.files.map((file) => {
      const fileBuffer = file.buffer;
      const fileName = file.originalname;
      return UploadFileToCloudinary(fileBuffer, fileName);
    });

    const results = await Promise.all(uploadPromises);

    return res.status(201).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Bulk file upload error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to upload files",
      error: error.message,
    });
  }
};

// Delete file
export const DeleteCourseFile = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "File not found! Please provide a valid id",
    });
  }
  try {
    await DeleteFileFromCloudinary(id);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("File deletion error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};
