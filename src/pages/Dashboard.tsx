import Card from "../components/Card";
import { Modal } from "../components/Modal";
import { useState } from "react";
import { Sidebar } from "../components/SideBar";
import SearchBox from "../components/SearchBox";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


export function Dashboard() {
  const [open, setOpen] = useState(false);
  const [panel, setpanel] = useState(false);

  return (
    <div>
      <Sidebar openpanel={panel} closepanel={() => {setpanel(false);}}/>
      <div className="flex justify-center items-center ">
        <div className="flex flex-col justify-center items-center mt-4 ">
          <Header setOpen={setOpen} />
          <Footer setpanel={setpanel} />
          <SearchBox />

          <div className="flex gap-2 md:justify-center max-w-6xl md:min-w-[1024px] border-gray-500/10 border  mx-auto justify-center flex-wrap mt-8 p-6 rounded-lg bg-zinc-600/3">
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
              url="https://x.com/Synthetic_Copy/status/1885360529318830422"
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

          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />

        </div>
      </div>
    </div>
  );
}

// export default App;
