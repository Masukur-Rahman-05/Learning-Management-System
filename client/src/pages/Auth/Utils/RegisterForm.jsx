import RenderForm from '@/Config/Form/RenderForm';
import { FormElements, validateOptions } from './RegisterElements';
import React from 'react';
import { CustomRegisterButton } from './FormButtons';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/Redux/auth/authSlice.js';
import { useToast } from '@/hooks/use-toast.js';

const RegisterForm = () => {

    const dispatch = useDispatch();
    const {toast} = useToast();

    const handleRegister = (data) => {
        try {
          dispatch(registerUser(data)).then((res) => {
            if (res?.payload?.success) {
              toast({
                title: `${res?.payload?.message}`,
              });
            } else {
              toast({
                title: `${res?.payload?.message}`,
                variant: "destructive",
              });
            }
          });
        } catch (error) {
          console.log(error.message);
        }
    };
    return (
      <div className="w-full">
        <div className="w-full py-5 ">
          <h1 className="text-2xl font-bold text-slate-400">Register</h1>
          <p className="text-sm text-gray-500">Please Register to get started</p>
        </div>
        <RenderForm
          formElements={FormElements}
          validateOptions={validateOptions}
          onSubmit={handleRegister}
          SubmitButton={CustomRegisterButton}
        />
      </div>
    );
};

export default RegisterForm;