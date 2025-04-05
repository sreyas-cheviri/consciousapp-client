import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hoverLogo, setHoverLogo] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const fullText: string = "Never Lose an Idea Again !";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dashboard");
    }

    setTimeout(() => setIsLoaded(true), 100);

    let currentIndex: number = 0;
    const typingInterval: number = window.setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        window.clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [navigate]);

  return (
    <main className="bg-white h-screen flex justify-center items-center">
      <article
        className={`m-8 p-10 w-screen h-[90vh] border-dashed border-2 rounded-lg   flex flex-col items-center justify-center text-white relative bg-cover bg-center bg-no-repeat px-4 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <header
          className="flex flex-col items-center transition-transform duration-500 hover:scale-105"
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
        >
          <img
            src="/logo.png"
            className={`w-10 md:w-12 rounded-full transition-all duration-500 ease-in-out ${
              hoverLogo ? "rotate-[360deg] " : ""
            }`}
            alt="Logo"
          />
          <h1
            className={`md:text-5xl  text-3xl  mt-2  text-black font-serif transition-all duration-300 ${
              hoverLogo ? "tracking-wider" : ""
            }`}
          >
            Conscious
          </h1>
        </header>


        <section className="md:mt-16 mt-12 font-medium text-zinc-800 text-center max-w-lg md:max-w-2xl text-md md:text-lg">
          <p className="min-h-6 text-lg md:text-2xl ">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
          <p className="mt-2 font-thin">
            Conscious, an AI-powered second brain that helps you store, recall,
            and link your knowledge effortlessly.
          </p>
        </section>

        <nav className="mt-10 group relative transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <Link to="/Signin" className="relative">
            <Button variant="primary" size="md">
              Get Started
            </Button>
          </Link>
        </nav>

        <footer className="absolute flex-col justify-center items-center opacity-50 flex text-zinc-800 bottom-1 text-xs">
          <p className="flex text-zinc-800 justify-center">
            © 2025 Conscious. All rights reserved.
          </p>
        </footer>
      </article>
    </main>
  );
}
