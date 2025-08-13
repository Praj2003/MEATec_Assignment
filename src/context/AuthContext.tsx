// src/context/AuthContext.tsx
import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const SESSION_KEY = "my-session";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem(SESSION_KEY)
  );

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        data = null; 
      }

      if (!res.ok) {
        console.error("Login failed:", data?.error || res.statusText);
        return;
      }


      localStorage.setItem(SESSION_KEY, JSON.stringify(data));
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
