
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import HomePage from "./pages/HomePage";


// ✅ Reusable wrapper for protected routes
const ProtectedRoute = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Clerk Auth Routes */}
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div style={{
                textAlign: "center",
                marginTop: "100px",
                fontSize: "24px",
                fontWeight: "bold"
              }}>
                404 - Page Not Found
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;