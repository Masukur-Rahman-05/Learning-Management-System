import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from './Utils/RegisterForm';
import LoginForm from './Utils/LoginForm';

const LoginRegistration = () => {
    return (
      <div className="w-[300px] lg:w-[500px] mt-5 ">
        <Tabs
          defaultValue="login"
          className="w-full flex flex-col items-center"
        >
          <TabsList className="w-full flex justify-evenly bg-slate-700 text-white p-4">
            <TabsTrigger value="login" className="w-1/2 focus:bg-black">
              Login
            </TabsTrigger>
            <TabsTrigger value="registration" className="w-1/2">
              Registration
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="w-[300px] lg:w-[400px]">
            <LoginForm />
          </TabsContent>
          <TabsContent value="registration" className="w-[300px] lg:w-[400px]">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default LoginRegistration;