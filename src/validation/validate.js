//======================================= Name Regex Validation ========================================//

// Validate a name with the given regular expression pattern
export const validateName = (name) => {
  const trimmedName = name.trim(); // Remove leading and trailing spaces
  return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(trimmedName));
}

//====================================== Email Regex Validation =======================================//

// Validate an email address with the given regular expression pattern
export const validateEmail = (email) => {
  const trimmedEmail = email.trim(); // Remove leading and trailing spaces
  return (/^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/.test(trimmedEmail));
}

//===================================== Password Regex Validation ====================================//

// Validate a password with the given regular expression pattern
export const validatePassword = (password) => {
  const trimmedPassword = password.trim(); // Remove leading and trailing spaces
  return (/^(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,15}$/.test(trimmedPassword));
}