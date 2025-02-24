export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignInErrors {
    email: string | null;
    password: string | null;
    general: string | null;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REQUIRED_EMAIL = 'test@test.test';
const REQUIRED_PASSWORD = 'password';

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: null };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }

  return { isValid: true, error: null };
};

export const validateSignInCredentials = (credentials: SignInCredentials): SignInErrors => {
  const emailValidation = validateEmail(credentials.email);
  const passwordValidation = validatePassword(credentials.password);

  const errors: SignInErrors = {
    email: emailValidation.error,
    password: passwordValidation.error,
    general: null,
  };

  // Check if credentials match required values
  if (emailValidation.isValid && passwordValidation.isValid) {
    if (credentials.email !== REQUIRED_EMAIL || credentials.password !== REQUIRED_PASSWORD) {
      errors.general = 'Invalid email or password';
    }
  }

  return errors;
};