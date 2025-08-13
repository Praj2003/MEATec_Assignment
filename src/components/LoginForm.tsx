import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); 
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return (
      <Card className="w-[400px] h-[200px] shadow-lg flex items-center justify-center">
        <p className="text-center text-lg font-medium">
          ✅ You’re logged in as <span className="font-bold">{email}</span>
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-[400px] h-[400px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">
          Welcome to Tasknest! 🎉
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="username"
              type="test"
              placeholder="Prajval Kanda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-14 cursor-pointer">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
