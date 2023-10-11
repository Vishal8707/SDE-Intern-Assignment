//======================================= Name Regex Validation ========================================//


export const validateName = (name) => {
    const trimmedName = name.trim();
      return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(trimmedName))
    }
    
    
    export const validateDescription = (title) => {
   
      return /^(.|\s)*[a-zA-Z]+(.|\s)*$/.test(title);
    }
    
    
    //====================================== Email Regex Validation =======================================//
    
    
    export const validateEmail = (email) => {
      const trimmedEmail = email.trim();
      return (/^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/.test(trimmedEmail))
    }
    
    
    //===================================== Password Regex Validation ====================================//
    
    
    export const validatePassword = (password) => {
      const trimedPassword = password.trim()
      return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(trimedPassword));
    }
    
    
    //==================================== Number Regex Validation ======================================//
    
    
    export const validateMobileNo = (number) => {
      const trimedNumber = number.trim()
      return ((/^((\+91)?|91)?[6789][0-9]{9}$/g).test(trimedNumber));
    }
    
    
    //===================================== Pincode Regex Validation ===================================//
    
    
    export const validatePincode = (pincode) => {
      
      return ((/^[1-9][0-9]{5}$/).test(pincode));
    }
    
    
    //===================================== Place Regex Validation ===================================//
    
    
    export const validatePlace = (value) => {
      return ((/^[^\W\d_]+\.?(?:[-\s'’][^\W\d_]+\.?)*$/).test(value));
    }
    
    
    
    // ===================================== Style validation ====================================== //
    
    
    const ValidateStyle =  (value) => {
      return ((/^[a-zA-Z _.-]+$/).test(value));
    };
    
    
    // ===================================== Price validation ====================================== //
    
    
    export const validatePrice =  (price) => {
      return ((/^\d{0,8}(\.\d{1,9})?$/).test(price));
    };
    
    
    // ===================================== Status validation ====================================== //
    
    
    export const ValidateStatus = (value) => { 
      return (['pending', 'completed', 'cancelled'].indexOf(value)) !== -1 
    }
    