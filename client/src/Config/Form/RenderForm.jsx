import React, { useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


const RenderForm = ({
  formElements,
  validateOptions,
  onSubmit,
  SubmitButton,
  initialData = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm({
    defaultValues: {
      ...initialData,
      terms: false,
    },
  });



  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {formElements.map((item, index) => {
          switch (item.inputType) {
            case "input":
              return (
                <div key={index}>
                  <Label>{item.label}</Label>
                  <Input
                    type={item.type}
                    placeholder={item.placeholder}
                    {...register(`${item.name}`, validateOptions[item.name])}
                  />
                  {errors[item.name] && (
                    <p className="text-red-500">{errors[item.name].message}</p>
                  )}
                </div>
              );

            case "checkbox":
              return (
                <div key={index} className="flex items-center gap-2">
                  <Controller
                    name={item.name}
                    control={control}
                    rules={validateOptions[item.name]}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        className=" border-white"
                      />
                    )}
                  />
                  <Label>{item.label}</Label>
                  {errors[item.name] && (
                    <p className="text-red-500">{errors[item.name].message}</p>
                  )}
                </div>
              );
            case "select": //.........................................Select................................
              return (
                <div key={index} className="w-[200px]">
                  <Label>{item.label}</Label>

                  <Controller
                    name={item.name}
                    control={control}
                    rules={validateOptions[item.name]}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select`} />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors[item.name] && (
                    <p className="text-red-500">{errors[item.name].message}</p>
                  )}
                </div>
              );

            case "textarea": //..............................................Text Area.........................
              return (
                <div key={index}>
                  <Label>{item.label}</Label>
                  <Textarea
                    {...register(`${item.name}`, validateOptions[item.name])}
                  />
                  {errors[item.name] && (
                    <p className="text-red-500">{errors[item.name].message}</p>
                  )}
                </div>
              );

            case "submit":
              return (
                <SubmitButton key={index} type={item.type}>
                  {item.label}
                </SubmitButton>
              );
          } //....................................................END Bracket..............................................
        })}
      </form>
    </div>
  );
};

export default RenderForm;
