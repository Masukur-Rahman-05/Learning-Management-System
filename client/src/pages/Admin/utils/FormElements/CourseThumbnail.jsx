
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  UploadCourseFile,
  DeleteCourseFile,
  resetUploadProgress,
} from "@/Redux/admin/CourseUpload.js";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/Config/UtilityComponents/ProgressBar.jsx";

const CourseThumbnail = ({ setThumbnailData,initialData }) => {
  // const [courseThumbnailInfo, setCourseThumbnailInfo] = useState({
  //   image: "",
  //   publicID: "",
  // });
  const [courseThumbnailInfo, setCourseThumbnailInfo] = useState(initialData);

  const { uploadProgress, isLoading } = useSelector(
    (state) => state.adminCourse
  );

  useEffect(() => {
    setThumbnailData(courseThumbnailInfo);
  }, [courseThumbnailInfo]);

  const dispatch = useDispatch();

  const handleImageUpload = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      const imageData = new FormData();
      imageData.append("file", selectedFile);

      const result = await dispatch(UploadCourseFile(imageData));
      console.log(result.payload);
      if (result?.payload?.success) {
        setCourseThumbnailInfo({
          image: result?.payload?.data?.url,
          publicID: result?.payload?.data?.public_id,
        });
        dispatch(resetUploadProgress());
      }
    } catch (error) {
      console.error(error.message);
      dispatch(resetUploadProgress());
    }
  };

  const handleDeleteThumbnail = async (id) => {
    try {
      const result = await dispatch(DeleteCourseFile(id));
      console.log(result);
      if (result?.payload?.success) {
        // Only clear the state if deletion succeeded
        setCourseThumbnailInfo({
          image: "",
          publicID: "",
        });
      } else {
        console.error("Failed to delete thumbnail:", result.message);
      }
    } catch (error) {
      console.error("Error while deleting thumbnail:", error.message);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="text-lg lg:text-2xl font-bold mt-5">
        Upload Course thumbnail Image
      </div>
      {uploadProgress > 0 && (
        <ProgressBar isMediaUploading={isLoading} progress={uploadProgress} />
      )}
      {courseThumbnailInfo?.image ? (
        <div className="flex flex-col gap-5">
          <img
            src={courseThumbnailInfo?.image}
            alt="thumbnail"
            className="w-[500px] h-[300px] object-cover object-fit"
          />
          <Button
            onClick={() => handleDeleteThumbnail(courseThumbnailInfo.publicID)}
          >
            Delete
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Input
            type="file"
            accept="image/*"
            placeholder="Upload Course thumbnail Image"
            onChange={handleImageUpload}
          />
        </div>
      )}
    </div>
  );
};

export default CourseThumbnail;