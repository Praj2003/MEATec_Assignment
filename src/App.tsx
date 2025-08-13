import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ActivityPage from "./pages/ActivityPage";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/taskManager" element={<ActivityPage />} />
      </Routes>
      <Toaster richColors closeButton position="top-right" />
      <Footer />
    </div>
  );
}

export default App;
