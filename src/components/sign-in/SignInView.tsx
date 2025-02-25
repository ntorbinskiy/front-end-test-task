import React, { JSX } from 'react';
import { SignInViewProps } from './SignInController';
import { FormContainer } from './components/FormContainer.tsx';
import { PasswordInput } from './components/inputs/PasswordInput.tsx';
import { Alert } from './components/Alert.tsx';
import { Button } from './components/Button.tsx';
import { EmailInput } from './components/inputs/EmailInput.tsx';

export const SignInView: React.FC<SignInViewProps> = ({
  credentials,
  errors,
  isLoading,
  handleChange,
  handleBlur,
  handleSubmit,
}): JSX.Element =>
  (
    <FormContainer title="Sign In">
      {errors.general && (
        <Alert
          type="danger"
          title="Error!"
          message={errors.general}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit} noValidate>
        <EmailInput
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          label="Email address"
          placeholder="Enter your email"
          className="mb-4"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          label="Password"
          placeholder="Enter your password"
          className="mb-6"
          required
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          loadingText="Signing in..."
          className="w-full"
        >
              Sign in
        </Button>
      </form>
    </FormContainer>
  );