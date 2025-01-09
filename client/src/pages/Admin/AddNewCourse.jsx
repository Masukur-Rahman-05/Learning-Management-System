import React, { useState,useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Curriculum from './utils/FormElements/Curriculum.jsx';
import CourseDetails from './utils/FormElements/CourseDetails.jsx';
import CourseThumbnail from './utils/FormElements/CourseThumbnail.jsx';
import {
  addCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
} from "@/Redux/admin/CourseSlice.js";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const AddNewCourse = () => {

  const params = useParams()
   const dispatch = useDispatch();

  const handleGetCourseDetails = async () => {
    const result = await dispatch(getCourseDetails({id:params.id}))

    if (result?.payload?.success) {
      const course = result.payload.data;

      // Populate form states with fetched course data
      setCourseDetailsData({
        courseTitle: course.courseTitle || "",
        subtitle: course.subtitle || "",
        description: course.description || "",
        category: course.category || "",
        language: course.language || "",
        level: course.level || "",
        price: course.price || "",
        welcomeMessage: course.welcomeMessage || "",
      });

      setCurriculumData(course.curriculum || [
        { title: "", videoUrl: "", freePreview: false, publicID: "" },
      ]);

      setThumbnailData(course.thumbnail || { image: "", publicID: "" });
    }
    
  }
  
  useEffect(() => {

    if (params.id) {
      handleGetCourseDetails()
    }
    
  },[params])



 
  const [curriculumData, setCurriculumData] = useState([
      {
        title: "",
        videoUrl: "",
        freePreview: false, // Setting Initial Data of curriculum Data
        publicID: "",
      },
  ]);
  const [courseDetailsData, setCourseDetailsData] = useState({
    courseTitle: "",
    subtitle: "",
    description: "",
    category: "", // Setting Initial Data of course Details Data
    language: "",
    level: "",
    price: "",
    welcomeMessage: "",
  });
  const [thumbnailData, setThumbnailData] = useState({
    image: "",
    publicID: "", // Setting Initial Data of course thumbnail
  });

  const [isValidCurriculumData, setIsValidCurriculumData] = useState(false)
  const [isValidCourseDetailsData, setIsValidCourseDetailsData] = useState(false); //State for validation
  const [isValidThumbnailData, setIsValidThumbnailData] = useState(false)

  

  useEffect(() => {
    const isCurriculumValid = curriculumData.every(
      (item) => item.title.trim() !== "" && item.videoUrl.trim() !== ""
    );

    const isThumbnailValid =
      thumbnailData.image !== "" && thumbnailData.publicID !== "";

    const isCourseDetailsValid =
      courseDetailsData.courseTitle !== "" &&
      courseDetailsData.subtitle !== "" &&
      courseDetailsData.description !== "" &&
      courseDetailsData.category !== "" &&
      courseDetailsData.language !== "" &&
      courseDetailsData.level !== "" &&
      courseDetailsData.price !== "" &&
      courseDetailsData.welcomeMessage !== "";

    setIsValidCurriculumData(isCurriculumValid);
    setIsValidThumbnailData(isThumbnailValid);
    setIsValidCourseDetailsData(isCourseDetailsValid);
  }, [curriculumData, thumbnailData, courseDetailsData]);

  const isValidAllData = isValidCurriculumData && isValidThumbnailData && isValidCourseDetailsData
   

   

  const handleSubmit = async () => {
    const formPayload = {
      courseTitle: courseDetailsData.courseTitle,
      subtitle: courseDetailsData.subtitle,
      description: courseDetailsData.description,
      category: courseDetailsData.category,
      language: courseDetailsData.language,
      level: courseDetailsData.level,
      price: courseDetailsData.price,
      welcomeMessage: courseDetailsData.welcomeMessage,
      curriculum: curriculumData,
      thumbnail: thumbnailData,
      date: new Date().toDateString(),
    };

    if (params.id) { 

      const result = await dispatch(updateCourse({id:params.id, data:formPayload}))

      if (result?.payload?.success) {
        console.log('Updated Successfully')
      }
    }

    else {

      const result = await dispatch(addCourse(formPayload)); //Sending data to backend

      if (result?.payload?.success) {
        const allCourses = await dispatch(getAllCourses());

        console.log(allCourses);
      }
      
    }
 
  }


    return (
      <div className="flex flex-col gap-4 mt-10 w-full p-10">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-5">
          <div>
            <h1 className="text-2xl font-bold">Add New Course</h1>
            <p className="text-red-500 text-sm ">
              Fill all the fields to "Submit" properly
            </p>
          </div>
          <Button onClick={() => handleSubmit()} disabled={!isValidAllData}>
            Submit
          </Button>
        </div>
        <Tabs defaultValue="curriculum" className="w-full overflow-x-auto">
          <TabsList className="grid  grid-cols-3 min-w-[500px] ">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="courseDetails">Course Details</TabsTrigger>
            <TabsTrigger value="courseThumbnail">Course Thumbnail</TabsTrigger>
          </TabsList>
          <TabsContent value="curriculum" className="w-full">
            <Curriculum
              setCurriculumData={setCurriculumData}
              initialData={curriculumData}
              // key={JSON.stringify(curriculumData)} // Use a key to trigger re-render
            />
          </TabsContent>
          <TabsContent value="courseDetails" className="w-full">
            <CourseDetails
              setCourseDetailsData={setCourseDetailsData}
              initialData={courseDetailsData}
            />
          </TabsContent>
          <TabsContent value="courseThumbnail" className="w-full">
            <CourseThumbnail
              setThumbnailData={setThumbnailData}
              initialData={thumbnailData}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default AddNewCourse;




/*






*/



// useEffect(() => {
  //  const isValid = curriculumData.every((item) => {
  //    return item.title.trim() !== "" && item.videoUrl.trim() !== "";  //checking if there any field that are not filled
  //  })
    
  //   setIsValidCurriculumData(isValid) // for curriculum data
  // }, [curriculumData])
  
  // useEffect(() => {
  //   const isValid = thumbnailData.image !== "" && thumbnailData.publicID !== ""; //checking if there any field that are not filled

  //   setIsValidThumbnailData(isValid);
  // }, [thumbnailData]);
  // useEffect(() => {
  //   const isValid =
  //     courseDetailsData.courseTitle !== "" &&
  //     courseDetailsData.subtitle !== "" &&
  //     courseDetailsData.description !== "" &&
  //     courseDetailsData.category !== "" && //checking if there any field that are not filled
  //     courseDetailsData.language !== "" &&
  //     courseDetailsData.level !== "" &&
  //     courseDetailsData.price !== "" &&
  //     courseDetailsData.welcomeMessage !== "";

  //   setIsValidCourseDetailsData(isValid);
  // }, [courseDetailsData]);