import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CircleX, Loader2 } from "lucide-react";
import cfaeebc3ea50c461b550a8cea90b2bdc from "../assets/cfaeebc3ea50c461b550a8cea90b2bdc.jpg";
import logo from "../assets/logo.png";
// import { ArrowBackIos } from "@mui/icons-material";

// import { MoveLeft } from "lucide-react";
// import { PushButtons } from "../components/PushButtons";
const API_URL = import.meta.env.VITE_API_URL;

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);
  // const [gloading, setgLoading] = useState(false);

  async function signin() {
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = PasswordRef.current?.value;

    console.log("API URL:", API_URL);
    try {
      const response = await axios.post(`${API_URL}/api/v1/signin`, {
        username,
        password,
      });
      const token = response.data.token;
      console.log(response.data); // Debugging API response
      localStorage.setItem("token", token);
      localStorage.setItem("username", response.data.username);
      setLoading(false);
      setInterval(() => {
        navigate("/Dashboard");
      }, 1000);
      // alert("Signed in");
    } catch (error: unknown) {
      setLoading(false);
      console.error("Signin error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message || "Signin failed. Try again.");
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

  // async function GuestSignup() {
  //   setgLoading(true);

  //   console.log("API URL:", API_URL);
  //   try {
  //     const response = await axios.post(`${API_URL}/api/v1/guest`);
  //     const token = response.data.token;
  //     localStorage.setItem("token", token);
  //   localStorage.setItem("username", "Guest");

  //   setgLoading(false);
  //   navigate("/Dashboard");
  //   alert("Logged in as Guest");
  // } catch (error) {
  //   setgLoading(false);
  //   setError("Guest login failed. Please try again.");
  //   console.error("Guest login error:", error);
  // }
  // }

  return (
    <div className="flex md:flex-row flex-col justify-center gap-2 ">
      
      <div className="flex  justify-center items-center min-h-screen  ">
        <div className="bg-zinc-300 border-gray-600 border dark:bg-zinc-100 flex rounded-xl p-[4px] relative">
          <div className="left-0 top-0 absolute z-50 justify-end flex-row p-2 text-gray-700 ">
            <Link to="/">
              <CircleX className="cursor-pointer size-5 hover:text-gray-600" />
            </Link>
          </div>

          <div className="flex flex-col p-5 bg-zinc-300 dark:bg-zinc-100 relative max-w-80 items-center justify-center gap-2 rounded-xl md:rounded-l-xl md:rounded-none">
            <div className="flex flex-col justify-center items-center mb-8">
              <img
                src={logo}
                className="h-8 rounded-full  mb-5 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
                alt=""
              />
              <h1 className="font-semibold text-2xl text-zinc-600">
                Welcome back!
              </h1>
              <p className="text-zinc-500 text-xs">
                First time here?{" "}
                <Link to="/Signup" className="text-zinc-800 font-semibold">
                  Sign up for free
                </Link>
              </p>
            </div>

            <Input
              placeholder="Username"
              reference={usernameRef}
              variant={"secondary"}
            />
            <Input
              type="password"
              placeholder="Password"
              reference={PasswordRef}
              variant={"secondary"}
              onKeyDown={(e) => e.key === "Enter" && signin()}
            />

            <Button
              variant={"new"}
              children={
                loading ? (
                  <div className="flex gap-2 items-center justify-center">
                    <Loader2 className=" h-5  w-5 animate-spin" /> Logging In...
                  </div>
                ) : (
                  "SignIn"
                )
              }
              size={"md"}
              loading={loading}
              onClick={signin}
             
            ></Button>
      

            {error && (
              <p className="text-red-500 font-semibold text-center text-xs mt-2">
                {error}
              </p>
            )}

            <p className="text-zinc-500 text-xs w-full text-justify mt-3 align-middle">
              By signing in, you agree to our{" "}
              <a href="#" className="text-zinc-800 ">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-zinc-800 ">
                Privacy Policy
              </a>
              .
            
            </p>
          </div>
          <div className="hidden h-96 w-64 md:block rounded-r-xl overflow-hidden relative">
            <img
              className="    contrast-75 backdrop-contrast-50"
              src={cfaeebc3ea50c461b550a8cea90b2bdc}
              alt=""
            />
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
