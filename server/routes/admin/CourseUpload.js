import express from "express";
import { UploadCourseFile, DeleteCourseFile,UploadBulkFiles } from "../../controller/admin/CourseUpload.js";
import { upload } from "../../helper/cloudinary.js";

const router = express.Router();

router.post('/upload', upload.single('file'), UploadCourseFile)
router.post('/bulk-upload', upload.array('files',10), UploadBulkFiles)
router.delete('/delete/:id', DeleteCourseFile)

export default router