import { Button } from "./components/Button";
import Card from "./components/Card";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
// import { ShareIcon } from "./icons/ShareIcon";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LinkIcon from "@mui/icons-material/Link";
import SearchIcon from "@mui/icons-material/Search";
import { Chips } from "./components/Chips";
import { Modal } from "./components/Modal";
import { useState } from "react";
import { ArrowUp, PanelLeftOpen } from "lucide-react";
import { PushButtons } from "./components/PushButtons";

function App() {
  const [open, setOpen] = useState(false);
  const handleScrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (

    <div className="flex justify-center items-center mt-4">
      <div className="       flex flex-col justify-center items-center ">
        <div className="flex flex-col shadow-black/70 shadow-2xl md:flex-row md:w-full items-center md:gap-3 gap-4  md:justify-between m-4 p-2 rounded-2xl bg-zinc-600/10 border-gray-500/5 border  ">
          <div className=" flex gap-4 items-center">
            <button>

            <img
              src="../public/f523bb5a1e9f3b67816ed619f8657428.jpg"
              alt=""
              className="h-10 rounded-xl  hover:-rotate-180 transform  ease-in-out  transition-all duration-300 "
              />
              </button>
            <h1 className="shadow-none  text-2xl text-zinc-500 font-serif  hover:text-zinc-500/90 transition-all duration-300">
              Welcome, Sreyas
            </h1>
          </div>

          <div className=" flex gap-1 md:gap-2 p-1 px-2 bg-zinc-600/20 w-fit rounded-lg  ">
            <Button
              variant="secondary"
              text="Share Brain"
              size="sm"
              startIcon={<LinkIcon style={{ fontSize: 20 }} />}
            />
            <Button
              onClick={() => { setOpen(true)}}
              variant="secondary"
              text="Add Memory"
              size="sm"
              startIcon={<AddIcon style={{ fontSize: 20 }} />}
            />
            <div className="flex gap-2 items-center justify-center">
                <PushButtons variant="opaque" icon={<CircleIcon style={{ fontSize: "16px" }}/>} size="sm"/>
                <PushButtons variant="opaque" icon={<LogoutIcon style={{ fontSize: "16px" }}/>} size="sm"/>
            </div>
          </div>
        </div>
        <div className="flex w-screen fixed m-10 p-10 text-zinc-900 z-40 justify-between ">
        <PushButtons variant="transparent" icon={<PanelLeftOpen />} size="sm"/>
        <PushButtons variant="transparent" icon={<ArrowUp />} size="sm" onClick={handleScrollToTop}/>
        </div>
        <div className="bg-zinc-600/30 md:mt-24 mt-10 flex shadow-xl shadow-black/30 w-[355px] rounded-xl md:w-[550px] border-gray-500/5    justify-between  border  p-1 text-gray-300">
        <textarea
  className="placeholder:opacity-40 bg-zinc-800 overflow-auto placeholder:italic h-16 placeholder:font-serif px-4 py-2 bg-transparent w-[305px] focus:outline-none rounded-l-xl md:w-[550px] resize-none"
  placeholder="Search your brain in natural language..."
></textarea>

          <button className=" border-gray-500/50 px-2 flex py-2 bg-zinc-800 rounded-r-xl hover:bg-zinc-700/20 ">
            <SearchIcon style={{ color: "gray" }} />
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <Chips text={"Urls"} />
          <Chips text={"Notes"} />
          <Chips text={"Randomize"} />
          <Chips text={"Date"} />
        </div>
        <div className="flex gap-2 md:justify-center max-w-6xl md:min-w-[1024px] border-gray-500/10 border  mx-auto justify-center flex-wrap mt-8 p-6 rounded-lg bg-zinc-600/5">
          <Card
            title="Meeting Notes"
            type="note"
            content="Important poHere’s a 300-word paragraph on the importance of lifelong learning:  

Lifelong learning is an essential pillar for personal and professional growth in today’s rapidly evolving world. With technology advancing at an unprecedented pace and industries undergoing constant transformation, the ability to adapt and acquire new skills has never been more crucial. Unlike traditional education, which often concludes in formal institutions, lifelong learning is a continuous process driven by curiosity and a desire to stay relevant. It fosters critical thinking, creativity, and resilience, enabling individuals to navigate challenges with confidence. Moreover, the accessibility of online platforms, workshops, and educational resources has democratized learning, making it easier than ever to explore diverse subjects from coding to philosophy. Lifelong learning also contributes to emotional well-being, as it encourages a growth mindset and a sense of accomplishment. Studies show that engaging in intellectual activities can improve cognitive functions, reduce stress, and even delay age-related cognitive decline. In the workplace, professionals who embrace lifelong learning are more likely to achieve career advancement, as they bring fresh perspectives and innovative ideas to their roles. Employers increasingly value adaptability and a willingness to learn over static expertise, recognizing that these qualities are key to sustaining organizational growth. Beyond career benefits, lifelong learning enriches personal life by expanding horizons and deepening understanding of the world. Whether it’s learning a new language, mastering a musical instrument, or exploring scientific concepts, the joy of discovery fosters a sense of purpose and connection to the broader community. Ultimately, lifelong learning is not just a tool for success but a philosophy that transforms how individuals perceive themselves and their potential. By cultivating curiosity and embracing change, we unlock opportunities to thrive in a dynamic world while contributing meaningfully to society.  

Let me know if you'd like this refined or expanded!y's meeting...Important points from ay's meeting...Important points from ay's meeting...Important points from ay's meeting...Important points from today's meeting..."
          />

          <Card
            title="Steve Jobs' 2005 Stanford Commencement Address
            "
            type="url"
            url="https://www.youtube.com/watch?v=UF8uR6Z6KLc&pp=ygURc3RldmUgam9icyBzcGVlY2g%3D"
          />

          <Card
            title="navals tweet saving"
            type="url"
            url="https://x.com/naval/status/1880519833118478567?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet"
          />
          <Card
            title="Sam Altman
            « Back to blog
            How To Be Successful"
            type="url"
            url="https://blog.samaltman.com/how-to-be-successful"
          />
          <Card
            title="frist note"
            type="note"
            content="this is the first note i have written in this app and i am very happy to be here and write this note. i hope to write more notes in the future and"
          />

          <Card
            title="How-to get started with UNMS Research How-to get started with the "
            type="url"
            url="https://www.youtube.com/watch?v=Es_l2JM12m8"
          />
          <Card
            title="frist note"
            type="url"
            url="https://sreyascheviri.vercel.app/"
          />
          <Card
            title="frist note"
            type="url"
            url="https://en.wikipedia.org/wiki/Steve_Jobs"
          />
          <Card
            title="frist note"
            type="url"
            url="https://www.youtube.com/watch?v=pN6jk0uUrD8&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&pp=iAQB"
          />
          <Card
            title="frist note"
            type="note"
            content="this is the first note i have written in this app and i am very happy to be here and write this note. i hope to write more notes in the future and"
          />
         
        </div>
<Modal open={open} onClose={() => { setOpen(false)}} />
      </div>
    </div>
  );
}

export default App;
