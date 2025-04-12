
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Simulate login with Google - immediately redirect to dashboard
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Set user as logged in immediately
    localStorage.setItem("userLoggedIn", "true");
    // Then navigate to dashboard
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full">
        <img 
          src="/lovable-uploads/796b2bf1-a44e-4399-8064-677f9a614493.png" 
          alt="Digital Network Background" 
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Glowing border box */}
      <div className="relative z-10 w-full max-w-md px-8 py-12 backdrop-blur-xl bg-black/40 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
        <div className="space-y-8">
          {/* Logo and heading */}
          <div className="text-center space-y-2">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-4">
              <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">GEN Z CLG</h1>
            <p className="text-purple-300/80">Connect. Learn. Earn.</p>
          </div>

          {/* Login section */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-lg text-white/90">Sign in to your account</p>
              <p className="text-sm text-purple-300/60 mt-1">Access your student dashboard</p>
            </div>

            {/* Google login button with animation */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-6 text-base font-medium bg-white hover:bg-gray-100 text-gray-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] hover:scale-[1.02] group"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-purple-600 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {isLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </Button>

            {/* OR divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-800/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-purple-300/60 bg-black/40">Or continue with</span>
              </div>
            </div>

            {/* Email login button with animation */}
            <Button
              variant="outline"
              className="w-full py-6 text-base font-medium border-purple-500/50 bg-transparent text-white hover:bg-purple-900/30 transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-[1.02] group"
              onClick={() => {
                // Set user as logged in
                localStorage.setItem("userLoggedIn", "true");
                // Redirect directly to dashboard
                navigate("/");
              }}
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                Email & Password
              </span>
            </Button>
          </div>

          {/* Footer links */}
          <div className="text-center text-sm">
            <p className="text-purple-300/60">
              By continuing, you agree to GEN Z CLG's {" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 blur-xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 blur-xl opacity-70"></div>
      </div>
    </div>
  );
}
