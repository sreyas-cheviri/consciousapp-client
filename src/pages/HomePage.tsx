import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
// import { GitHub, X } from "@mui/icons-material";
import { useEffect } from "react";
import logo from "../assets/logo.png";
// import bg from "../assets/bg.png"

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-200  text-white relative bg-cover bg-center bg-no-repeat px-4">
      <img
        src={logo}
        className="w-12 md:w-12 rounded-fulltransition-transform duration-500 ease-in-out hover:rotate-[360deg]"
        alt="Logo"
      />
      <h1 className="text-5xl mt-2 italic text-black  font-serif">Conscious</h1>{" "}
      <span className="-rotate-12 hover:rotate-0 transition-all opacity-50 duration-300">
        <Button variant={"new"} children={"Beta"} size={"vsm"}></Button>
      </span>
      <p className="md:mt-16 mt-12 font-medium text-zinc-800 text-center max-w-lg md:max-w-2xl text-md md:text-xl">
  Never Lose an Idea Again <br />
  Conscious, a second brain that helps you store, recall, and link your knowledge effortlessly.
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
          {/* <Button
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
          ></Button> */}

          <p className="flex text-zinc-800  justify-center">© Conscious 2025</p>
        </div>
      </div>
    </div>
  );
}
