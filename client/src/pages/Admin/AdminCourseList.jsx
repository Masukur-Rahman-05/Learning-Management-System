import React from 'react';
import { useDispatch,useSelector } from 'react-redux';

const AdminCourseList = () => {

    const { courseData } = useSelector((state) => state.adminCourseSlice);

    return (
        <div>
            {
                courseData && courseData.length > 0 ? (
                    <div>
                        {
                            courseData.map((course) => {
                                return (
                                    <div>
                                        <h1>{course.courseTitle}</h1>
                                    </div>
                                )
                            })
                        }
                </div>
                ): <h1>No course are available</h1>
            }
        </div>
    );
};

export default AdminCourseList;