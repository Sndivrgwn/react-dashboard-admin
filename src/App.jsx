import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login/LoginPage";
import Register from "./components/auth/register/RegisterPage";
import Profile from "./components/auth/profile/ProfilePage";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./components/auth/forgot_password/ForgotPassword";
import ResetPassword from "./components/auth/reset_password/ResetPassword";
import PageNotFound from "./components/error/ErrorPageNotFound";
import TwoFactorAuth from "./components/auth/2fa/TwoFactorAuth";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<TwoFactorAuth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
