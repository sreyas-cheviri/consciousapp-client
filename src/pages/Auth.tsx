import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CircleX, Loader2 } from "lucide-react";
import cfaeebc3ea50c461b550a8cea90b2bdc from "../assets/cfaeebc3ea50c461b550a8cea90b2bdc.jpg";
import signupimg from "../assets/07cd57c62930a45e8d19d9d8d36aa85c.jpg";
import { Eye , EyeClosed} from 'lucide-react';
// import logo from "../assets/logo.png";

const API_URL = import.meta.env.VITE_API_URL;

export function Auth() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string[]>([]);
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0);
  const [showPassword , setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSignUp = location.pathname === "/Signup";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    usernameRef.current?.focus();
  }, [isSignUp]);

 
  const handleInputChange = () => {
    if (error.length > 0) {
      const newErrors = error.filter((_, index) => index > currentErrorIndex);
      setError(newErrors);
      setCurrentErrorIndex(0);
    }
  };

  async function handleAuth() {
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = PasswordRef.current?.value;

    try {
      if (isSignUp) {
      
        
        await axios.post(`${API_URL}/api/v1/auth/signup`, {
          username,
          password,
        });
        setLoading(false);
        navigate("/Signin");
      } else {
        const response = await axios.post(`${API_URL}/api/v1/auth/signin`, {
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
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          const errorData = error.response.data;
          if (Array.isArray(errorData.message)) {
            setError(errorData.message);
          } else if (Array.isArray(errorData.messages)) {
            setError(errorData.messages);
          } else if (typeof errorData.message === 'string') {
            setError([errorData.message]);
          } else {
            setError([`${isSignUp ? "Signup" : "Signin"} failed. Try again.`]);
          }
          setCurrentErrorIndex(0);
        } else if (error.request) {
          setError(["No response from server."]);
        } else {
          setError(["Something went wrong. Please try again."]);
        }
      } else {
        setError(["An unexpected error occurred. Please try again."]);
      }
    }
  }

  return (
    <div className="flex md:flex-row flex-col justify-center gap-2">
        <h1 className="absolute top-0  text-center text-gray-400 text-md text-xs  rounded p-2">Hosted on free instance, which may delay requests by 50 seconds or more due to inactivity, please wait. </h1>
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
                src="/logo.png"
                className="h-8 rounded-full mb-1 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
                alt=""
              />
              <h1 className="font-semibold text-2xl text-zinc-600">
                {isSignUp ? "Sign up and get started!" : "Welcome back!"}
              </h1>
              <p className="text-zinc-500 text-sm">
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
                    <Link to="/Signup" className="text-zinc-800  font-semibold">
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
              onChange={handleInputChange}
            />
            <Input
              type={showPassword? "text" : "password"}
              placeholder="Password"
              reference={PasswordRef}
              variant={"secondary"}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              onChange={handleInputChange}
              endICon={<button className="flex justify-center pointer-events-auto " onClick={(e)=>{
                e.preventDefault();
                setShowPassword(prev => !prev)
              }}>
                { showPassword ?<Eye size={20} color="gray"/> : <EyeClosed size={20} color="gray"/> }</button>}
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

            {error.length > 0 && (
              <p className="text-red-500 font-semibold text-center text-xs animate-smoothLanding">
                {error[currentErrorIndex]}
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
              alt="images conscious"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
