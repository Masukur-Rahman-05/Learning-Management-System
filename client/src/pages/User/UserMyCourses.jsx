import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaidCourses } from '@/Redux/user/UserPaidCourseSlice.js';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const UserMyCourses = () => {

  const navigate = useNavigate()

    const { userPaidCourseData, isLoading } = useSelector(
      (state) => state.userPaidCourseSlice
    );
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    console.log(user?.id)

    
    useEffect(() => {
        dispatch(getAllPaidCourses({ id: user?.id }))

        console.log(userPaidCourseData)
        
    }, [dispatch])
  
  if (isLoading) {
    return (
      <div className="bg-slate-950 w-screen h-screen flex items-center justify-center">
        <PulseLoader size={13} color="#c026dc" speedMultiplier={0.7} />
      </div>
    );
  }
    return (
      <div className="w-screen min-h-screen flex flex-col gap-5  text-white p-5">
        <div className=" w-[90%] h-16 mx-auto border-slate-500 border-[1px] rounded-xl flex items-center justify-center">
          <h1 className="text-base lg:text-2xl font-bold text-center">
            THE COURSES YOU HAVE ENROLLED
          </h1>
            </div>
            

            <div className='w-full h-full flex flex-col items-center'>
                {
                    userPaidCourseData.length > 0 ? (
                        <div className='w-full h-full  flex flex-wrap justify-center gap-5 '>
                            {
                                userPaidCourseData.map((item, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="w-[300px] h-[300px] text-center border-[1px] border-slate-500 rounded-xl flex flex-col gap-4 cursor-pointer hover:opacity-70 duration-150"
                                        onClick={()=> navigate(`/courses/${item.courseId}`)}
                                      >
                                        <div className="w-full h-[150px]">
                                          <img
                                            src={item.courseImage}
                                            className="w-full h-full rounded-xl object-cover"
                                          />
                                        </div>

                                        <h1 className="text-xl font-bold p-5">
                                          {item.title}
                                        </h1>
                                      </div>
                                    );
                                })
                            }
                    </div>
                    ) : <p className='text-2xl'>There is no course which is enrolled by YOU</p>
                    }

            </div>
      </div>
    );
};

export default UserMyCourses;