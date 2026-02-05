import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./feature/LoginPage/components/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import Board from "./feature/board/Board";
import Dashboard from "./feature/dahsboard/components/dashboard";
// import SignUp from "./feature/SignUp/SignUp";
// import ProfilePage from "./feature/profilePage/profilePage";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} /> */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
