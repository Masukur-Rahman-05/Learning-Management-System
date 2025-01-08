

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoPlayer from "@/Config/video/VideoPlayer.jsx";
import {
  getCourseProgress,
  markCourseProgress,
  resetCourseProgress,
} from "@/Redux/user/CourseProgressSlice.js";
import { PulseLoader } from "react-spinners";

const UserCourseProgress = () => {
  const [lectureVideo, setLectureVideo] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [courseProgress, setCourseProgress] = useState([]);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const isFetchingRef = useRef(false); // Guard for fetch logic
  const courseCompletedRef = useRef(false); // Prevent multiple calls when completed

  // Fetch course progress and curriculum
  const fetchCourseProgress = useCallback(async () => {
    if (isFetchingRef.current) return; // Prevent duplicate fetches
    isFetchingRef.current = true;

    try {
      const result = await dispatch(
        getCourseProgress({ courseId: id, userId: user?.id })
      );

      if (result?.payload?.success) {
        const { courseDetails, progress, completed } = result.payload.data;

        setCourseDetails(courseDetails);
        setCourseProgress(progress);

        // Only set course completion if not already set
        if (!courseCompletedRef.current) {
          setIsCourseCompleted(completed || false);
          courseCompletedRef.current = completed || false;
        }

        // Determine which video to start with
        let startVideoIndex = 0;
        if (progress && progress.length > 0) {
          const lastViewedLecture = progress[progress.length - 1];
          startVideoIndex =
            courseDetails.curriculum.findIndex(
              (lecture) => lecture._id === lastViewedLecture.lectureId
            ) + 1;
        }

        // Ensure we don't go out of bounds
        startVideoIndex = Math.min(
          startVideoIndex,
          courseDetails.curriculum.length - 1
        );

        setLectureVideo(courseDetails.curriculum[startVideoIndex]);
        setCurrentVideoIndex(startVideoIndex);
      }
    } catch (error) {
      console.error("Failed to fetch course progress:", error);
    } finally {
      isFetchingRef.current = false;
    }
  }, [dispatch, id, user?.id]);

  useEffect(() => {
    fetchCourseProgress();
  }, [fetchCourseProgress]);

  const handleVideoProgress = async () => {
    try {
      const result = await dispatch(
        markCourseProgress({
          courseId: id,
          userId: user?.id,
          lectureId: lectureVideo._id,
        })
      );

      if (result?.payload?.success) {
        if (!isCourseCompleted) {
          fetchCourseProgress(); // Refresh progress if the course is not completed
        }
      }
    } catch (error) {
      console.error("Failed to mark course progress:", error);
    }
  };

  const handleResetCourse = async () => {
    try {
      await dispatch(
        resetCourseProgress({
          courseId: id,
          userId: user?.id,
        })
      );

      // Refetch course progress after reset
      await fetchCourseProgress();
      setIsCourseCompleted(false);
      courseCompletedRef.current = false;
    } catch (error) {
      console.error("Failed to reset course progress:", error);
    }
  };

  const playNextVideo = useCallback(() => {
    if (!courseDetails) return;

    if (currentVideoIndex >= courseDetails.curriculum.length - 1) {
      setIsCourseCompleted(true);
      courseCompletedRef.current = true;
      return;
    }

    const nextVideoIndex = currentVideoIndex + 1;
    setLectureVideo(courseDetails.curriculum[nextVideoIndex]);
    setCurrentVideoIndex(nextVideoIndex);
    setVideoProgress(0); // Reset video progress
  }, [currentVideoIndex, courseDetails]);

  useEffect(() => {
    if (videoProgress === 100) {
      handleVideoProgress();
      playNextVideo();
    }
  }, [videoProgress, playNextVideo]);

  const handleSelectVideo = (video, index) => {
    // Before course completion, only allow selecting viewed or next unviewed videos
    if (!isCourseCompleted) {
      const viewedLectureIds = courseProgress.map((p) => p.lectureId);
      const isLastViewedIndex =
        viewedLectureIds.length > 0
          ? courseDetails.curriculum.findIndex(
              (l) => l._id === viewedLectureIds[viewedLectureIds.length - 1]
            )
          : -1;

      if (index > isLastViewedIndex + 1) {
        return; // Prevent selecting unwatch videos
      }
    }

    setLectureVideo(video);
    setCurrentVideoIndex(index);
  };

  // If no course details or no lecture video, show loading
  if (!courseDetails || !lectureVideo) {
    return (
      <div className="w-screen h-[700px] bg-black flex items-center justify-center ">
        <PulseLoader size={13} color="#c026dc" speedMultiplier={0.7} />
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5  text-white">
      {isCourseCompleted && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
          <h2 className="text-[24px] lg:text-4xl font-bold text-green-500 mb-4 text-wrap text-center px-5">
            Congratulations! Course Completed!
          </h2>
          <p className="text-[16px] lg:text-xl mb-6">
            You've watched all videos in this course.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleResetCourse}
              className="px-4 lg:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Restart Now
            </button>
            <button
              onClick={() => {
                setLectureVideo(courseDetails.curriculum[0]);
                setCurrentVideoIndex(0);
                setIsCourseCompleted(false);
              }}
              className="px-4 lg:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Watch Again
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row p-10 gap-8 justify-between items-center">
        <div className="w-full xl:w-1/2 h-[400px] md:px-10 lg:pl-8">
          <VideoPlayer
            key={lectureVideo?._id}
            url={lectureVideo?.videoUrl}
            width={"100%"}
            height={"100%"}
            setVideoProgress={setVideoProgress}
          />
          <p className="text-xl">{lectureVideo?.title}</p>
        </div>
        <div className="w-full xl:w-1/2 lg:pl-20 my-5">
          <h1 className="text-xl lg:text-3xl font-bold text-green-500 mt-16 lg:mt-0">
            Course Curriculum
          </h1>
          <div className="my-5 lg:ml-6">
            {courseDetails.curriculum.map((item, index) => {
              const isViewed = courseProgress.some(
                (progress) => progress.lectureId === item._id
              );

              // Determine if the video is selectable
              const viewedLectureIds = courseProgress.map((p) => p.lectureId);
              const isLastViewedIndex =
                viewedLectureIds.length > 0
                  ? courseDetails.curriculum.findIndex(
                      (l) =>
                        l._id === viewedLectureIds[viewedLectureIds.length - 1]
                    )
                  : -1;
              const isSelectable =
                isCourseCompleted || index <= isLastViewedIndex + 1;

              return (
                <div
                  key={index}
                  onClick={() => isSelectable && handleSelectVideo(item, index)}
                  className={`my-5 border-[1px] rounded-xl p-3 lg:p-5 ${
                    isSelectable
                      ? "cursor-pointer hover:bg-slate-800"
                      : "opacity-50 cursor-not-allowed"
                  } ${
                    index === currentVideoIndex
                      ? "border-green-500 bg-green-900/20"
                      : "border-slate-500"
                  }`}
                >
                  <p className="text-sm lg:text-lg font-semibold text-slate-400">
                    {item.title}
                    {isViewed && !isCourseCompleted && (
                      <span className="ml-2 text-green-500">(Completed)</span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourseProgress;
