
import RenderForm from '@/Config/Form/RenderForm';
import { FormElements, validateOptions } from './LoginElements';
import { CustomLoginButton } from './FormButtons';
import React from 'react';
import { loginUser } from '@/Redux/auth/authSlice.js';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

    const handleLogin = (data) => {
        try {
          dispatch(loginUser(data)).then((res) => {
            if (res?.payload?.success) {
              console.log(res.payload.token)
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
    }
    return (
      <div className="w-full">
        <div className='w-full py-5'>
                <h1 className='text-2xl font-bold text-slate-400'>Login</h1>
                <p className='text-sm text-gray-500'>Login to get access</p>
        </div>
        <RenderForm
          formElements={FormElements}
          validateOptions={validateOptions}
          onSubmit={handleLogin}
          SubmitButton={CustomLoginButton}
        />
      </div>
    );
};

export default LoginForm;