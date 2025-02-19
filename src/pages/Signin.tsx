import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

// import { MoveLeft } from "lucide-react";
// import { PushButtons } from "../components/PushButtons";
const API_URL = import.meta.env.VITE_API_URL;

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    usernameRef.current?.focus();
  },[])
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
      navigate("/Dashboard");
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
    <div className="flex justify-center items-center min-h-screen ">
      {/* <div className="m-10 absolute md:top-36  left-80">
        <Link to="/">
          <PushButtons variant={"opaque"} icon={<MoveLeft />} size={"sm"} />
        </Link>
      </div> */}
      <div className="bg-zinc-500 flex rounded-3xl p-[4px]">
        <div className="flex flex-col p-5 bg-zinc-300 max-w-80 items-center justify-center gap-2 rounded-3xl md:rounded-l-3xl md:rounded-none">
          <div className="flex flex-col justify-center items-center mb-8">
            <img
              src="../src/assets/logo.png"
              className="h-8 rounded-full border border-gray-500 mb-5 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
              alt=""
            />
            <h1 className="font-semibold text-lg text-zinc-600">
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
            placeholder="Password"
            reference={PasswordRef}
            variant={"secondary"}
          />

          <Button
            variant={"new"}
            children={loading ? <div className="flex gap-2 items-center justify-center"><Loader2 className=" h-5  w-5 animate-spin"  /> Logging In...</div>: "SignIn"}
            size={"md"}
            loading={loading}
            onClick={signin}
          ></Button>
          {/* <Button
            variant={"new"}
            children={gloading ? "Logging in as a Guest...." : "Continue as a Guest"}
            size={"md"}
            loading={gloading}
            onClick={GuestSignup}
          ></Button> */}

          {error && (
            <p className="text-red-500 font-semibold text-center text-xs mt-2">
              {error}
            </p>
          )}

          <p className="text-zinc-500 text-xs w-full text-justify mt-3 align-middle">
            By signing in, you agree to our{" "}
            <a href="#" className="text-zinc-800 font-semibold">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-zinc-800 font-semibold">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="hidden md:block">
          <img
            className="h-fit w-64 rounded-r-3xl contrast-75 backdrop-contrast-50"
            src="../src/assets/07cd57c62930a45e8d19d9d8d36aa85c.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
