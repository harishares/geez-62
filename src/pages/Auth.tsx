
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) return setError(error.message);
      toast({ title: "Login Successful" });
      navigate("/dashboard");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: email.split("@")[0] } }
      });
      setLoading(false);
      if (error) return setError(error.message);
      toast({ title: "Signup successful – check your email for confirmation!" });
      setMode("login");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <img 
          src="/lovable-uploads/796b2bf1-a44e-4399-8064-677f9a614493.png" 
          alt="Digital Network Background" 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative z-10 w-full max-w-md px-8 py-12 backdrop-blur-xl bg-black/40 rounded-xl border border-purple-500/30 shadow-lg space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-2">GEN Z CLG</h1>
        <div className="flex justify-center gap-4 mb-4">
          <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")}>Login</Button>
          <Button variant={mode === "signup" ? "default" : "outline"} onClick={() => setMode("signup")}>Sign Up</Button>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <Input 
            type="email"
            required
            disabled={loading}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input 
            type="password"
            required
            disabled={loading}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-xs text-purple-200 text-center mt-6">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            className="underline hover:text-white ml-1"
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
