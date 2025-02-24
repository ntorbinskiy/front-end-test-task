import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { SignInCredentials, SignInErrors, validateSignInCredentials } from './sign-in-model';
import { useAppDispatch, useAppSelector } from '../../store/store.tsx';
import { loginFailure, loginStart, loginSuccess } from '../../store/slices/authSlice.tsx';
import { SignInView } from './SignInView.tsx';

export interface SignInViewProps {
    credentials: SignInCredentials;
    errors: SignInErrors;
    isLoading: boolean;
    touched: {
        email: boolean;
        password: boolean;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const SignInController: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.loading);

  const [credentials, setCredentials] = useState<SignInCredentials>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<SignInErrors>({
    email: null,
    password: null,
    general: null,
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name as keyof typeof touched]) {
      const validationErrors = validateSignInCredentials({
        ...credentials,
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name as keyof SignInErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const validationErrors = validateSignInCredentials(credentials);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name as keyof SignInErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const validationErrors = validateSignInCredentials(credentials);
    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.values(validationErrors).some((error) => error !== null)) {
      return;
    }

    dispatch(loginStart());

    try {
      await new Promise((r) => setTimeout(r, 1000)); // Simulate API call

      if (credentials.email === 'test@test.test' && credentials.password === 'password') {
        dispatch(loginSuccess({
          email: credentials.email,
          name: credentials.email.split('@')[0],
          id: Math.random(),
          role: 'user',
        }));
      } else {
        dispatch(loginFailure('Invalid email or password'));
        setErrors((prev) => ({ ...prev, general: 'Invalid email or password' }));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(loginFailure('An error occurred during sign in'));
      setErrors((prev) => ({ ...prev, general: 'An error occurred during sign in' }));
    }
  };

  const viewProps: SignInViewProps = {
    credentials,
    errors,
    isLoading,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };

  return <SignInView {...viewProps} />;
};