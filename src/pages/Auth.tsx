import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CircleX, Loader2 } from "lucide-react";
import cfaeebc3ea50c461b550a8cea90b2bdc from "../assets/cfaeebc3ea50c461b550a8cea90b2bdc.jpg";
import signupimg from "../assets/07cd57c62930a45e8d19d9d8d36aa85c.jpg";
import logo from "../assets/logo.png";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function Auth() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignUp = location.pathname === "/Signup";

  useEffect(() => {
    usernameRef.current?.focus();
  }, [isSignUp]);

  async function handleAuth() {
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = PasswordRef.current?.value;

    try {
      if (isSignUp) {
        await axios.post(`${API_URL}/api/v1/signup`, {
          username,
          password,
        });
        setLoading(false);
        navigate("/Signin");
      } else {
        const response = await axios.post(`${API_URL}/api/v1/signin`, {
          username,
          password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("username", response.data.username);
        setLoading(false);
        setInterval(() => {
          navigate("/Dashboard");
        }, 1000);
      }
    } catch (error: unknown) {
      setLoading(false);
      console.error(`${isSignUp ? "Signup" : "Signin"} error:`, error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message ||
              `${isSignUp ? "Signup" : "Signin"} failed. Try again.`
          );
        } else if (error.request) {
          setError("No response from server.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  // Function to handle Google login
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/v1/auth/google`;
  };

  return (
    <div className="flex md:flex-row flex-col justify-center gap-2">
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-zinc-300 border-gray-600 border dark:bg-zinc-100 flex rounded-xl p-[4px] relative">
          <div className="right-0 p-3 top-0 absolute z-50 justify-end flex-row  text-gray-700 md:text-gray-200">
            <Link to="/">
              <CircleX className="cursor-pointer size-5 hover:text-gray-400 md:hover:text-gray-500" />
            </Link>
          </div>

          <div className="flex flex-col p-5 bg-zinc-300 dark:bg-zinc-100 relative max-w-80 items-center justify-center gap-2 rounded-xl md:rounded-l-xl md:rounded-none">
            <div className="flex flex-col justify-center items-center mb-8">
              <img
                src={logo}
                className="h-8 rounded-full mb-5 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
                alt=""
              />
              <h1 className="font-semibold text-2xl text-zinc-600">
                {isSignUp ? "Sign up and get started!" : "Welcome back!"}
              </h1>
              <p className="text-zinc-500 text-xs">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <Link to="/Signin" className="text-zinc-800 font-semibold">
                      Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    First time here?{" "}
                    <Link to="/Signup" className="text-zinc-800 font-semibold">
                      Sign up for free
                    </Link>
                  </>
                )}
              </p>
            </div>

            <Input
              placeholder="Username"
              reference={usernameRef}
              variant={"secondary"}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            />
            <Input
              type="password"
              placeholder="Password"
              reference={PasswordRef}
              variant={"secondary"}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            />

            <Button
              variant={"new"}
              children={
                loading ? (
                  <div className="flex gap-2 items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />{" "}
                    {isSignUp ? "Signing Up..." : "Logging In..."}
                  </div>
                ) : isSignUp ? (
                  "Sign Up"
                ) : (
                  "Sign In"
                )
              }
              size={"md"}
              loading={loading}
              onClick={handleAuth}
            />

            {/* Google Sign In Button */}
            <div className="mt-4 w-full">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Sign in with Google
              </button>
            </div>

            {error && (
              <p className="text-red-500 font-semibold text-center text-xs mt-2">
                {error}
              </p>
            )}

            <p className="text-zinc-500 text-xs w-full text-justify mt-3 align-middle">
              By {isSignUp ? "signing up" : "signing in"}, you agree to our{" "}
              <a href="#" className="text-zinc-800">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-zinc-800">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="hidden h-96 w-64 md:block rounded-r-xl overflow-hidden relative">
            <img
              className="contrast-75 backdrop-contrast-50"
              src={isSignUp ? signupimg : cfaeebc3ea50c461b550a8cea90b2bdc}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
