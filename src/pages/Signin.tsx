import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin() {
  return (
    <div className="flex  justify-center items-center min-h-screen ">
      <div className="bg-zinc-500 flex rounded-3xl p-[4px]   ">
        <div className="flex flex-col p-8 bg-zinc-300 max-w-80  items-center justify-center gap-2 rounded-3xl md:rounded-l-3xl md:rounded-none">
          <div className="flex  flex-col justify-center items-center mb-8">
            <img
              src="../src/assets/logo.png"
              className="h-8 rounded-full border border-gray-500 mb-5 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
              alt=""
            />
            <h1 className="font-semibold  text-lg text-zinc-600">
              Welcome back!
            </h1>
            <p className="text-zinc-500 text-xs">
              Frist time here?{" "}
              <Link to="/Signup" className="text-zinc-800 font-semibold">
                Sign up for free
              </Link>
            </p>
          </div>

          <Input
            placeholder="Username"
            onChange={() => {}}
            variant={"secondary"}
          />
          <Input
            placeholder="Password"
            onChange={() => {}}
            variant={"secondary"}
          />

          <Button variant={"new"} children={"SignIn"} size={"md"}></Button>
          <p className="text-zinc-500 text-xs w-full text-justify mt-3 align-middle">
  By signing in, you agree to our <a href="#" className="text-zinc-800 font-semibold">Terms of Service</a> and{" "}
  <a href="#" className="text-zinc-800 font-semibold">Privacy Policy</a>.
</p>

        </div>
        <div className=" hidden md:block">
          <img
            className="h-[11cm] w-64  rounded-r-3xl  contrast-75 backdrop-contrast-50 "
            src="../src/assets/07cd57c62930a45e8d19d9d8d36aa85c.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
