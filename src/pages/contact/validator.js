function validateName(name) {
  const nameError = document.getElementById("nameError");
  if (name.value.trim().length < 3) {
    nameError.textContent = "Name must be atleast 3 characters.";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function validateEmail(email) {
  const emailError = document.getElementById("emailError");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email.value.trim())) {
    emailError.textContent = "Invalid email address.";
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validatePhoneNumber(phoneNumber) {
  const phoneError = document.getElementById("phoneNumberError");
  const pattern = /^\d{10}$/;
  if (!pattern.test(phoneNumber.value.trim())) {
    phoneError.textContent = "Phone number be 10 digits.";
    return false;
  }
  phoneError.textContent = "";
  return true;
}

function validatePassword(password) {
  const passwordError = document.getElementById("passwordError");
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
  if (!pattern.test(password.value.trim())) {
    passwordError.textContent =
      "Must be atleast 8 character with one uppercase (A-Z), one lowercase (a-z), and one special character.";
    return false;
  }
  passwordError.textContent = "";
  return true;
}


export function setupEvents(){
  const form = document.getElementById("registrationForm");
  const successMessage = document.getElementById("success-message");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phoneNumber");
  const password = document.getElementById("password");

  name.addEventListener("blur", ()=> validateName(name));
  email.addEventListener("blur",()=> validateEmail(email));
  phoneNumber.addEventListener("blur",()=> validatePhoneNumber(phoneNumber));
  password.addEventListener("blur",()=> validatePassword(password));

  form.addEventListener("input", function (event) { 
    switch (event.target.id) {
      case "name":
        validateName(name);
        break;
        case "email":
        validateEmail(email);
        break;
      case "phoneNumber":
        validatePhoneNumber(phoneNumber);
        break;
      case "password":
        validatePassword(password);
        break;
    }
  });
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      (phoneNumber.value.trim() ? validatePhoneNumber(phoneNumber) : true)
    ) {
      const response = {};
      successMessage.textContent = "Account created Successfully.🎉";
      response["name"] = name.value;
      response["email"] = email.value;
      response["password"] = password.value;
      if (phoneNumber.value.trim()) {
        response["phoneNumber"] = phoneNumber.value;
      }
      console.log(response);
      form.reset();
    } else {
      successMessage.textContent = "";
    }
  });
}