import SignUp from "./Components/SignUp";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import LogIn from "./Components/LogIn";
import UpdateProfile from "./Components/UpdateProfile";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          {/* protected routes, cannot access until user is authenticated */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/update" element={<UpdateProfile />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
