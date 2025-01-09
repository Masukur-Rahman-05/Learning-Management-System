import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const UserContact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_hzc5itm", "template_27ldxkr", form.current, {
        publicKey: "vjOo_TtmUzz95MijF",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="w-screen h-screen flex flex-col gap-5  text-white">
      <h1 className="mx-16 lg:mx-auto text-lg md:text-xl lg:text-3xl font-bold mt-[4%] text-green-500 text-center">
        If You have any Query or Problem Please Contact Us
      </h1>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full lg:w-[50%] px-10 lg:mx-auto my-[3%] space-y-8"
      >
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            type="text"
            name="user_name"
            required
            className="border-[1px] border-slate-500"
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            name="user_email"
            required
            className="border-[1px] border-slate-500"
          />
        </div>
        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea
            name="message"
            className="h-[100px] border-[1px] border-slate-500"
            required
          />
        </div>
        <Input
          type="submit"
          value="Send"
          className="bg-violet-600 border-none outline-none cursor-pointer hover:bg-violet-800 font-bold"
        />
      </form>
    </div>
  );
};

export default UserContact;
