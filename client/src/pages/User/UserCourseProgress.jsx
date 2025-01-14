

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
  const isFetchingRef = useRef(false);
  const courseCompletedRef = useRef(false);

  const fetchCourseProgress = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const result = await dispatch(
        getCourseProgress({ courseId: id, userId: user?.id })
      );

      if (result?.payload?.success) {
        const { courseDetails, progress, completed } = result.payload.data;

        setCourseDetails(courseDetails);
        setCourseProgress(progress);

        if (!courseCompletedRef.current) {
          setIsCourseCompleted(completed || false);
          courseCompletedRef.current = completed || false;
        }

        let startVideoIndex = 0;
        if (progress && progress.length > 0) {
          const lastViewedLecture = progress[progress.length - 1];
          startVideoIndex =
            courseDetails.curriculum.findIndex(
              (lecture) => lecture._id === lastViewedLecture.lectureId
            ) + 1;
        }

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
          fetchCourseProgress();
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
    setVideoProgress(0);
  }, [currentVideoIndex, courseDetails]);

  useEffect(() => {
    if (videoProgress === 100) {
      handleVideoProgress();
      playNextVideo();
    }
  }, [videoProgress, playNextVideo]);

  const handleSelectVideo = (video, index) => {
    if (!isCourseCompleted) {
      const viewedLectureIds = courseProgress.map((p) => p.lectureId);
      const isLastViewedIndex =
        viewedLectureIds.length > 0
          ? courseDetails.curriculum.findIndex(
              (l) => l._id === viewedLectureIds[viewedLectureIds.length - 1]
            )
          : -1;

      if (index > isLastViewedIndex + 1) {
        return;
      }
    }

    setLectureVideo(video);
    setCurrentVideoIndex(index);
  };

  if (!courseDetails || !lectureVideo) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <PulseLoader size={15} color="#c026dc" speedMultiplier={0.8} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  text-cyan-50 p-4 md:p-8">
      {isCourseCompleted && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center backdrop-blur-md">
          <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6 text-center px-5 animate-pulse">
            Congratulations! Course Completed!
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-cyan-200">
            You've mastered all videos in this course.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={handleResetCourse}
              className="px-6 py-3 bg-cyan-500 text-gray-900 rounded-full hover:bg-cyan-400 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 shadow-lg shadow-cyan-500/50"
            >
              Restart Now
            </button>
            <button
              onClick={() => {
                setLectureVideo(courseDetails.curriculum[0]);
                setCurrentVideoIndex(0);
                setIsCourseCompleted(false);
              }}
              className="px-6 py-3 bg-blue-500 text-gray-900 rounded-full hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg shadow-blue-500/50"
            >
              Watch Again
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg shadow-cyan-500/50 border border-cyan-500/30">
            <VideoPlayer
              key={lectureVideo?._id}
              url={lectureVideo?.videoUrl}
              width="100%"
              height="100%"
              setVideoProgress={setVideoProgress}
            />
          </div>
          <h2 className="text-base lg:text-2xl font-semibold text-cyan-400 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
            {lectureVideo?.title}
          </h2>
        </div>
        <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
          <h1 className="text-xl lg:text-3xl font-bold text-cyan-400 mb-6 bg-gray-800/50 p-4 rounded-t-lg backdrop-blur-sm">
            Course Curriculum
          </h1>
          <div className="space-y-2 pr-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-800 bg-gray-800/30 rounded-b-lg backdrop-blur-sm">
            {courseDetails.curriculum.map((item, index) => {
              const isViewed = courseProgress.some(
                (progress) => progress.lectureId === item._id
              );
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
                  className={`p-4 rounded-lg transition-all duration-300 ease-in-out ${
                    isSelectable
                      ? "cursor-pointer hover:bg-cyan-800/30 hover:shadow-md"
                      : "opacity-50 cursor-not-allowed"
                  } ${
                    index === currentVideoIndex
                      ? "border-l-4 border-cyan-500 bg-cyan-900/40"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <p className="text-[12px] lg:text-lg font-medium text-cyan-100">
                    {item.title}
                    {isViewed && !isCourseCompleted && (
                      <span className="ml-2 text-cyan-400 text-sm">
                        (Completed)
                      </span>
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

