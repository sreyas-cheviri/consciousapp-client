// import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "./components/Button";
import Card from "./components/Card";
// import { AddIcon } from "./icons/AddIcon";
import AddIcon from "@mui/icons-material/Add";
// import { ShareIcon } from "./icons/ShareIcon";
import LinkIcon from "@mui/icons-material/Link";
// import { Chips } from "./components/Chips";

function App() {
  return (
    <div className="flex justify-center items-center m-10">
      <div className="   bg-zinc-900  max-w-5xl  mx-auto flex flex-col justify-center items-center">
        <div className=" flex gap-2 p-2 bg-zinc-600/30 w-fit rounded-lg ">
          <Button
            variant="secondary"
            text="Share Brain"
            size="md"
            startIcon={<LinkIcon style={{ fontSize: 20 }} />}
          />
          <Button
            variant="primary"
            text="Add Memory"
            size="md"
            startIcon={<AddIcon style={{ fontSize: 20 }} />}
          />
        </div>

        <div className="flex gap-2 m-4 md:justify-center justify-start flex-wrap mt-20 p-8 rounded-lg bg-zinc-600/30">
          <Card
            title="Meeting Notes"
            type="note"
            content="Important poHere’s a 300-word paragraph on the importance of lifelong learning:  

Lifelong learning is an essential pillar for personal and professional growth in today’s rapidly evolving world. With technology advancing at an unprecedented pace and industries undergoing constant transformation, the ability to adapt and acquire new skills has never been more crucial. Unlike traditional education, which often concludes in formal institutions, lifelong learning is a continuous process driven by curiosity and a desire to stay relevant. It fosters critical thinking, creativity, and resilience, enabling individuals to navigate challenges with confidence. Moreover, the accessibility of online platforms, workshops, and educational resources has democratized learning, making it easier than ever to explore diverse subjects from coding to philosophy. Lifelong learning also contributes to emotional well-being, as it encourages a growth mindset and a sense of accomplishment. Studies show that engaging in intellectual activities can improve cognitive functions, reduce stress, and even delay age-related cognitive decline. In the workplace, professionals who embrace lifelong learning are more likely to achieve career advancement, as they bring fresh perspectives and innovative ideas to their roles. Employers increasingly value adaptability and a willingness to learn over static expertise, recognizing that these qualities are key to sustaining organizational growth. Beyond career benefits, lifelong learning enriches personal life by expanding horizons and deepening understanding of the world. Whether it’s learning a new language, mastering a musical instrument, or exploring scientific concepts, the joy of discovery fosters a sense of purpose and connection to the broader community. Ultimately, lifelong learning is not just a tool for success but a philosophy that transforms how individuals perceive themselves and their potential. By cultivating curiosity and embracing change, we unlock opportunities to thrive in a dynamic world while contributing meaningfully to society.  

Let me know if you'd like this refined or expanded!y's meeting...Important points from ay's meeting...Important points from ay's meeting...Important points from ay's meeting...Important points from today's meeting..."
          />

          <Card
            title=""
            type="url"
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />

          <Card
            title="Big twitter heading"
            type="url"
            url="https://x.com/merishabh_singh/status/1879431445946745266"
          />
          <Card
            title="Tweet Link"
            type="url"
            url="https://x.com/salehdotdev/status/1879506316689039384"
          />
          <Card
            title="frist note"
            type="note"
            content="this is the first note i have written in this app and i am very happy to be here and write this note. i hope to write more notes in the future and"
          />
          <Card
            title="song"
            type="url"
            url="https://www.youtube.com/watch?v=B2UBMTA57JI&list=RDB2UBMTA57JI&start_radio=1"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
