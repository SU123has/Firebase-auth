import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      console.log("Password reset mail sent!");
      setMessage("Check your inbox for further instructions.");
    } catch (error) {
      console.log("Error during password change", error);
      setError("Failed to reset password!", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-100" style={{ maxWidth: "500px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button type="submit" className="w-100 mt-5" disabled={loading}>
              Reset Password
            </Button>
            <div className="text-center mt-2 w-100">
              <Link to="/login">Log In</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>{" "}
      </div>
    </div>
  );
};

export default ForgotPassword;
