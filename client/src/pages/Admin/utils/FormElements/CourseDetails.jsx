import React, { useState } from 'react';
import { category,language, level } from '../FormUtils/CourseDetails.js';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button.jsx';


const CourseDetails = ({ setCourseDetailsData, initialData }) => {
  const [formData, setFormData] = useState(initialData);


   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };

   const handleSelectChange = (name, value) => {
     setFormData({ ...formData, [name]: value });
   };
 
  const handleCourseDetailsSubmit = (e) => {

    e.preventDefault()
    setCourseDetailsData(formData)
    
    console.log(formData)
  };
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">Provide course details</h1>
      </div>

      <div>
        

        <form className="space-y-3" onSubmit={handleCourseDetailsSubmit}>
          <div>
            <Label>Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              placeholder="Enter Course Title"
              value={formData.courseTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              placeholder="Enter Subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              onValueChange={(value) => handleSelectChange("category", value)}
              value={formData.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {category?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select
              onValueChange={(value) => handleSelectChange("language", value)}
              value={formData.language}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {language?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Level</Label>
            <Select
              onValueChange={(value) => handleSelectChange("level", value)}
              value={formData.level}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {level?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              placeholder="Enter Course Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Welcome Message</Label>
            <Textarea
              name="welcomeMessage"
              placeholder="Enter a Welcome Message"
              value={formData.welcomeMessage}
              onChange={handleChange}
            />
          </div>

          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  );
};

export default CourseDetails;




{
  /* <div>
        <RenderForm
          formElements={FormElements}
          validateOptions={validateOptions}
          onSubmit={handleCourseDetailsSubmit}
          SubmitButton={CustomSaveButton}
          initialData={initialData}
        />
      </div> */
}






