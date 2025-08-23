import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Spinner, Container, Alert } from "react-bootstrap";

function ProtectedRoute({ children, requiredRole = null }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner
            animation="border"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading...</p>
        </div>
      </Container>
    );
  }

  // Check if user is authenticated
  if (!currentUser) {
    if (requiredRole === "admin") {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/dermatologist/derma_login" />;
  }

  // Check if email is verified (only for dermatologist)
  if (requiredRole === "dermatologist" && !userProfile?.emailVerified) {
    return <Navigate to="/dermatologist/emailverification" />;
  }

  // Check if user profile is loaded
  if (!userProfile) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading profile...</span>
          </Spinner>
          <p className="mt-3">Loading profile...</p>
        </div>
      </Container>
    );
  }

  // Check role-based access
  if (requiredRole && userProfile.User_Role !== requiredRole) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>You don't have permission to access this page.</p>
          <hr />
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-outline-danger"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Check if dermatologist account is approved
 if (
   requiredRole === "dermatologist" &&
   userProfile.User_ValidDermatologist_ID === false
 ) {
   return (
     <Container className="d-flex justify-content-center align-items-center vh-100">
       <Alert variant="warning" className="text-center">
         <Alert.Heading>Account Pending Approval</Alert.Heading>
         <p>
           Your dermatologist account is currently being reviewed by our
           administrators.
         </p>
         <p>
           You will receive an email notification once your account is approved.
         </p>
         <hr />
         <div className="d-flex gap-2 justify-content-center">
           <button
             className="btn btn-outline-warning"
             onClick={() =>
               (window.location.href = "/dermatologist/derma_login")
             }
           >
             Back to Login
           </button>
         </div>
       </Alert>
     </Container>
   );
 }

  return children;
}

export default ProtectedRoute;
