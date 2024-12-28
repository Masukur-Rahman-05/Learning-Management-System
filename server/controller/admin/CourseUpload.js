import {
  UploadFileToCloudinary,
  DeleteFileFromCloudinary,
} from "../../helper/cloudinary.js";



export const UploadCourseFile = async (req,res) => {
  try {
    const result = await UploadFileToCloudinary(req.file.path);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
      console.log(error.message)
    throw new Error("Failed to upload file", error.message);
  }
};

export const DeleteCourseFile = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "File Not found!Please provide a valid id",
        })
    }
    try {

        await DeleteFileFromCloudinary(id);

        return res.status(200).json({
            success: true,
            message: "File deleted successfully",
        })
        
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to delete file", error.message);
    }
}


//.......................................................UploadMultiple Files


export const UploadBulkFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files provided!",
      });
    }

    const uploadPromises = req.files.map((file) =>
      UploadFileToCloudinary(file.path)
    );

    const results = await Promise.all(uploadPromises);

    return res.status(201).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to upload files", error.message);
  }
};


