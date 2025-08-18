import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import App from './App.jsx';

// Use the correct environment variable for your build tool (e.g., Vite)
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env file');
}

const ClerkApp = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      appearance={{
        variables: {
          colorPrimary: '#522b85',
        },
        elements: {
          formButtonPrimary: 'bg-[#522b85] hover:bg-[#6c3cbf] text-white',
          formFieldInput: 'border-gray-300 focus:border-[#522b85]',
          footerActionLink: 'text-[#522b85] hover:text-[#6c3cbf]',
        },
      }}
    >
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                <App />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkApp />
    </BrowserRouter>
  </React.StrictMode>
);