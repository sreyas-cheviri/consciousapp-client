import { Link } from "react-router-dom";
import { Button } from "../components/Button";
// import { Chips } from "../components/Chips";

export default function HomePage() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center text-white relative bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('./src/assets/bg.png')" }}
    >
        {/* <Button variant={"roundchips"} children={"Beta"} size={"sm"}></Button> */}
      <img
        src="../src/assets/logo.png"
        className="w-12 md:w-10 rounded-full border border-gray-500 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
        alt="Logo"
      />

      <h1 className="text-4xl mt-10 italic opacity-60 font-serif">Conscious</h1>
      <p className="opacity-60   md:mt-40 mt-16 italic font-serif text-center max-w-lg md:max-w-2xl text-sm  md:text-xl">
        Never Lose an Idea Again! <br />
        Conscious helps you store, recall, and link your knowledge effortlessly.
      </p>

      <div className="mt-10">
        <Link to="/Signin">
          <Button variant="primary" size="sm">
            Sign In
          </Button>
        </Link>
      </div>
      <div className=" flex justify-center items-center">
        <p className="absolute text-gray-800 bottom-2 text-xs opacity-60">
          © Conscious 2025
        </p>
      </div>
    </div>
  );
}
