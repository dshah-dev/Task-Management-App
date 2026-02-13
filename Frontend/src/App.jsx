import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Board from "./components/board/components";
import Dashboard from "./components/dahsboard/components/dashboard";
import Navbar from "./components/Navbar/index";
import OfflineView from "./common/components/OfflineView";
import { useOnlineStatus } from "./common/hooks/useOnlineStatus";
function App() {

  const { isOnline, handleRetry } = useOnlineStatus();
  
  if (!isOnline) {
    return <OfflineView onRetry={handleRetry} />;
  }

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
