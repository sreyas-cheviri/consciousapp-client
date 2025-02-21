import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { GitHub, X } from "@mui/icons-material";
import { useEffect } from "react";

export default function HomePage() {

const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token != null) {
    navigate("/Dashboard");
  }
}, [navigate]);


  return (



    <div
      className="h-screen flex flex-col items-center justify-center  text-white relative bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('../src/assets/bg.png')" }}
      >
      {/* <Button variant={"roundchips"} children={"Beta"} size={"sm"}></Button> */}
      <img
        src="../src/assets/logo.png"
        className="w-12 md:w-10 rounded-full border border-gray-500 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
        alt="Logo"
        />

      <h1 className="text-4xl mt-2 italic text-white opacity-60 font-serif">Conscious</h1>  <span className="-rotate-12 hover:rotate-0 transition-all duration-300"><Button variant={"new"} children={"Beta"} size={"vsm"} ></Button></span>
      <p className="opacity-60   md:mt-24 mt-14  text-center max-w-lg md:max-w-2xl text-sm  md:text-xl">
        Never Lose an Idea Again! <br />
        Conscious helps you store, recall, and link your knowledge effortlessly.
      </p>

      <div className="mt-10 hover:-translate-y-[3px] duration-200">
        <Link to="/Signin">
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </Link>
      </div>
      <div className=" flex justify-center items-center  ">
        <div className="absolute flex-col justify-center items-center opacity-50 flex text-zinc-800 bottom-2 text-xs ">
          <Button
            variant={"round"}
            size={"vsm"}
            startIcon={
              <a
              href="https://x.com/sreyascheviri"
              target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-black p-1 flex rounded-full"
              >
                <X sx={{ fontSize: "15px" }} />
              </a>
            }
            children={"|"}
            endIcon={
              <a
              href="https://github.com/sreyas-cheviri/superconscious-client"
              target="_blank"
              rel="noopener noreferrer"
              className=" p-1 hover:text-black flex rounded-full"
              >
                <GitHub sx={{ fontSize: "15px" }} />
              </a>
            }
          ></Button>

          <p className="flex text-zinc-800  justify-center">© Conscious 2025</p>
        </div>
      </div>
    </div>
          
  );
}
