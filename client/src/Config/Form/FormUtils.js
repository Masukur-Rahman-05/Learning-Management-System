export const FormElements = [
  {
    inputType: "input",
    type: "text",
    label: " Username",
    name: "username",
    placeholder: "Enter your Username",
  },
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
    inputType: "checkbox",
    type: "checkbox",
    label: "Agree to terms and conditions",
    name: "terms",
  },
  {
    inputType: "select",
    type: "select",
    label: "Choose Department",
    name: "department",
    options: ["CSE", "ECE", "EEE", "CE"],
  },
  {
    inputType: "textarea",
    type: "textarea",
    label: "Description",
    name: "description",
    placeholder: "Enter your Description",
  },
  {
    inputType: "submit",
    type: "submit",
    label: " Login",
  },
];

const noWhiteSpaceValidate = (value) => {
  if (value.trim() === "") {
    return "No whitespace is allowed";
  }
  return true;
};

const blackListedEmails = ["admin@example.com", "user@example.com"];
const blackListedDomains = ["baddomain", "xyz", "example", "admin", "user"];
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

const emailValidate = (email) => {
  if (blackListedEmails.includes(email)) {
    return "Try different email";
  } else if (blackListedDomains.includes(email.split("@")[1].split(".")[0])) {
    return "Domain is restricted.Try different email";
  } else if (!emailPattern.test(email)) {
    return "Invalid email address";
  }
  return true;
};

const passwordValidate = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const hasSpacial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasUpperCase)
    return "Password must contain at least one uppercase letter";
  if (!hasLowerCase)
    return "Password must contain at least one lowercase letter";
  if (!hasNumeric) return "Password must contain at least one number";
  if (!hasSpacial)
    return "Password must contain at least one special character";

  return true;
};

export const validateOptions = {
  username: {
    required: "Username is required",
    validate: noWhiteSpaceValidate,
  },
  email: {
    required: "Email is required",
    validate: {
      emailValidate,
      noWhiteSpaceValidate,
    },
  },

  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    validate: {
      passwordValidate,
      noWhiteSpaceValidate,
    },
  },
  terms: {
    required: "You must agree with our terms and conditions",
  },
  department: {
    required: "Please select a department",
  },
  description: {
    required: "Please enter a description",
    validate: noWhiteSpaceValidate,
  },
};



