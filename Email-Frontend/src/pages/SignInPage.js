import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #1f1f3f, #522b85)'
    }}>
      <SignIn 
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  );
};

export default SignInPage;  