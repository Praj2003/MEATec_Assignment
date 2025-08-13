import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ActivityPage from "./pages/ActivityPage";
import { Toaster } from "sonner";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/taskManager" element={<ActivityPage />} />
          <Route path="/loginForm" element={<LoginPage />} />
        </Routes>
        <Toaster richColors closeButton position="top-right" />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
