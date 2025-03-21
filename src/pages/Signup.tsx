import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { CircleX, Loader2 } from "lucide-react";
import logo from "../assets/logo.png"
import signupimg from "../assets/07cd57c62930a45e8d19d9d8d36aa85c.jpg"
// import { ArrowBackIos } from "@mui/icons-material";
// import { PushButtons } from "../components/PushButtons";
// import { MoveLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  // const [gloading, setgLoading] = useState(false);
  async function signup() {
    setLoading(true);
    const username = usernameRef.current?.value;
    const password = PasswordRef.current?.value;

    console.log("API URL:", API_URL);
    try {
      await axios.post(`${API_URL}/api/v1/signup`, {
        username,
        password,
      });
      setLoading(false);
      navigate("/Signin");
      // alert("signed up");
    } catch (error: unknown) {
      setLoading(false)
      console.error("Signup error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message || "Signup failed. Try again.");
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

  return (

    <div className="flex md:flex-row flex-col justify-center ">




    <div className="flex  justify-center items-center min-h-screen  ">
     
      <div className="bg-zinc-300 flex border-gray-600 border dark:bg-zinc-100  rounded-xl p-[4px]  relative ">
      <div className="left-0 top-0 absolute z-50 justify-end flex-row p-2 text-gray-700 ">
              <Link to="/">
                <CircleX className="cursor-pointer size-5 hover:text-gray-600" />
              </Link>
            </div>
            
        <div className="flex flex-col p-5 bg-zinc-300 max-w-80 dark:bg-zinc-100  items-center justify-center gap-2 rounded-xl md:rounded-l-xl md:rounded-none">
          <div className="flex  flex-col justify-center items-center mb-8">
            <img
              src={logo}
              className="h-8 rounded-full  mb-5 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
              alt=""
            />
            <h1 className="font-semibold  text-2xl text-zinc-600">
              Sign up and get started!
            </h1>
            <p className="text-zinc-500 text-xs">
              Already have an account?{" "}
              <Link to="/Signin" className="text-zinc-800 font-semibold">
                Sign in
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
          />

          <Button
            variant={"new"}
            onClick={signup}
            children={loading ? <div className="flex gap-2 items-center justify-center"><Loader2 className=" h-5 w-5 animate-spin"  /> Signing Up...</div> : "SignUp"}
            loading ={loading}
            size={"md"}
          ></Button>
     
         {error && (
            <p className="text-red-500 font-semibold text-center text-xs mt-2">
              {error}
            </p>
          )}
          <p className="text-zinc-500 text-xs w-full text-justify mt-3 align-middle">
            By signing up, you agree to our{" "}
            <a href="#" className="text-zinc-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-zinc-800 ">
              Privacy Policy
            </a>
            .
            
          </p>
            
        </div>
        <div className="hidden h-96 w-64 md:block rounded-r-xl overflow-hidden">
          <img
            className="  contrast-75 backdrop-contrast-50 "
            src={signupimg}
            alt=""
            />
        </div>
      </div>
    </div></div>
  );
}
