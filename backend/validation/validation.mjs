export const isValidEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

export const isValidText = (value, minLength = 1) => {
  return value && value.trim().length >= minLength;
}

export const isValidPassword = (password) => {
  // Check if password is at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  /* // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if password contains at least one digit
  if (!/[0-9]/.test(password)) {
    return false;
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return false; 
  }*/

  // If all checks pass, return true
  return true;
}

