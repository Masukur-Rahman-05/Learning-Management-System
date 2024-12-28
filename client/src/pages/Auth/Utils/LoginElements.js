export const FormElements = [
  {
    inputType: "input",
    type: "email",
    label: " Email",
    name: "email",
    placeholder: "Enter your Email",
  },
  {
    inputType: "input",
    type: "password",
    label: " Password",
    name: "password",
    placeholder: "Enter your Password",
  },

  {
    inputType: "submit",
    type: "submit",
    label: "Login",
    
  },
];

const noWhiteSpaceValidate = (value) => {
  if (value.trim() === "") {
    return "No whitespace is allowed";
  }
  return true;
};


export const validateOptions = {
  
  email: {
    required: "Email is required",
    validate: {
      noWhiteSpaceValidate,
    },
  },

  password: {
    required: "Password is required",
    
    validate: {
      noWhiteSpaceValidate,
    },
  },
  

  
};

/*



*/
