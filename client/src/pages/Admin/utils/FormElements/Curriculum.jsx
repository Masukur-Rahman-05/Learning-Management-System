
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UploadCourseFile,
  DeleteCourseFile,
  UploadBulkFiles,
} from "@/Redux/admin/CourseUpload.js";
import VideoPlayer from "@/Config/video/VideoPlayer.jsx";
import ProgressBar from '@/Config/UtilityComponents/ProgressBar.jsx';
import { FiUpload } from "react-icons/fi";

const Curriculum = ({ setCurriculumData, initialData }) => {

  const [courseCurriculumFormData, setCourseCurriculumFormData] =
    useState(initialData);
  
  const [bulkImages, setBulkImages] = useState([]);
  const bulkInputRef = useRef(null);

  const { isLoading, uploadProgress } = useSelector(
    (state) => state.adminCourse
  );

    useEffect(() => {
      if (initialData && Array.isArray(initialData)) {
        setCourseCurriculumFormData(initialData);
      }
    }, [initialData]);

  useEffect(() => {
    setCurriculumData(courseCurriculumFormData);
  }, [courseCurriculumFormData]);

  const dispatch = useDispatch();

  const handleAddLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        title: "",
        videoUrl: "",
        freePreview: false,
        publicID: "",
      },
    ]);
  };

  const isAddButtonDisable = () => {
    return courseCurriculumFormData.every((item) => {
      return item && typeof item === 'object' && item.title.trim() !== '' && item.videoUrl.trim() !== '';
    })
  }

  const handleTitleChange = (event, currentIndex) => {
    const copyFormdata = [...courseCurriculumFormData];
    copyFormdata[currentIndex] = {
      ...copyFormdata[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(copyFormdata);
  };


  const handleFreePreview = (currentValue, currentIndex) => {
    const copyFormdata = [...courseCurriculumFormData];
    copyFormdata[currentIndex] = {
      ...copyFormdata[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(copyFormdata);
  };

  const handleVideoUpload = async (event, currentIndex) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormdata = new FormData();
      videoFormdata.append("file", selectedFile);
      console.log(videoFormdata);
      try {
        const result = await dispatch(UploadCourseFile(videoFormdata)).then(
          (res) => {
            if (res?.payload?.success) {
              let copyFormdata = [...courseCurriculumFormData];
              copyFormdata[currentIndex] = {
                ...copyFormdata[currentIndex],
                videoUrl: res?.payload?.data?.url,
                publicID: res?.payload?.data?.public_id,
              };
              setCourseCurriculumFormData(copyFormdata);
            }
          }
        );

        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDeleteCourseFile = async (id,getIndex) => {
    try {

      const result = await dispatch(DeleteCourseFile(id))

      if (result?.payload?.success) {
        const updatedCurriculum = [...courseCurriculumFormData];

        
        updatedCurriculum[getIndex] = {
          ...updatedCurriculum[getIndex],
          videoUrl: "",
          publicID: "",
        };

        
        setCourseCurriculumFormData(updatedCurriculum);

          
        console.log('File Deleted Successfully')
      }
      
    } catch (error) {
      console.log(error.message)
      throw new Error('Failed to delete file from frontend', error.message)
    }
  }

  const handleBulkUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const bulkFileData = new FormData();


    selectedFiles.forEach((file) => bulkFileData.append('files', file))

    try {

      const result = await dispatch(UploadBulkFiles(bulkFileData))

      if (result?.payload?.success) {
        // Extract uploaded files data
        const uploadedFiles = result.payload.data; // Assuming this is an array of file objects

        // Map the uploaded files to curriculum format
        const newLectures = uploadedFiles.map((file) => ({
          title: "", // Default title
          videoUrl: file.url, // Cloudinary file URL
          publicID: file.public_id, // Cloudinary public ID
          freePreview: false, // Default
        }));

        // Merge with existing curriculum data
        setCourseCurriculumFormData( [ ...newLectures]);

        console.log("Bulk Upload Successful", newLectures);
      } else {
        console.error("Bulk Upload Failed");
      }
      
    } catch (error) {
      console.log(error.message)
    }
    

    setBulkImages(bulkFileData);
  }

  
  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-4">
        <h1 className="text-lg lg:text-2xl font-bold">Create course curriculum</h1>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-3">
          <Button
            disabled={!isAddButtonDisable() || isLoading}
            onClick={handleAddLecture}
            className={
              !isAddButtonDisable() || isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }
          >
            Add Lecture
          </Button>

          <div>
            <Input
              type="file" multiple accept="video/*"
              ref={bulkInputRef}
              className='hidden'
              onChange={(e) => handleBulkUpload(e)}
            />
            <Button onClick={() => bulkInputRef.current.click()}><FiUpload/>Bulk Upload</Button>
          </div>
        </div>
      </div>

      <div>
        {courseCurriculumFormData.map((item, index) => {
          return (
            <div className="border p-5 rounded-lg" key={index}>
              <div className="flex flex-col lg:flex-row items-center gap-5">
                <p>Lecture {index + 1}</p>
                <Input
                  type="text"
                  placeholder="Enter Lecture Title"
                  name={`title[${index}]`}
                  className="lg:w-[300px]"
                  onChange={(e) => handleTitleChange(e, index)}
                  value={courseCurriculumFormData[index].title}
                />

                <div className="flex items-center gap-4">
                  <Switch
                    onCheckedChange={(value) => handleFreePreview(value, index)}
                    checked={courseCurriculumFormData[index].freePreview}
                    id={`freePreview${index + 1}`}
                  />
                  <Label htmlFor={`freePreview${index + 1}`}>
                    Set as Free Preview
                  </Label>
                </div>
              </div>

              <div>
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div>
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width={`300px`}
                      height={`200px`}
                    />
                    <Button
                      onClick={() =>
                        handleDeleteCourseFile(
                          courseCurriculumFormData[index].publicID,
                          index
                        )
                      }
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Input
                      type="file"
                      accept="video/*"
                      className="mt-6"
                      onChange={(e) => handleVideoUpload(e, index)}
                    />
                    <ProgressBar
                      progress={uploadProgress}
                      isMediaUploading={isLoading}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculum;
