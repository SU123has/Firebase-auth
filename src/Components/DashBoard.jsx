import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      console.log("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      setError("Failed to logout!");
      console.log(error);
    }
  }
  return (
    <>
      <Card>
        <Card.Header>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Header>
        <Card.Body>
          <strong>Email: </strong>
          {currentUser.email}
        </Card.Body>
        <Card.Footer>
          <Link to="/update">
            <Button variant="primary btn w-100">Update Account</Button>
          </Link>
        </Card.Footer>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default DashBoard;
