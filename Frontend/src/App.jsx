import "./App.css";
import LoginPage from "./feature/auth/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </>
  );
}

export default App;
