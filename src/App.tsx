import { Button } from "./components/Button";
import Card from "./components/Card";
// import { AddIcon } from "./icons/AddIcon";
import AddIcon from '@mui/icons-material/Add';
// import { ShareIcon } from "./icons/ShareIcon";
import LinkIcon from '@mui/icons-material/Link';
// import { Chips } from "./components/Chips";

function App() {
  return <div className="m-0 h-svh  bg-zinc-900 p-10 max-w-5xl mx-auto">
  
   <div className=" flex gap-2 p-2 bg-zinc-600/30 w-fit rounded-lg ">
   <Button variant="secondary" text="Share Brain" size="md" startIcon ={<LinkIcon style={{ fontSize: 20}}/>}/>
   <Button variant="primary" text="Add Memory" size="md" startIcon ={<AddIcon style={{ fontSize: 20}}/>}/> 
   </div>

   <div className="flex gap-1 m-10 justify-center ">

<Card 
  title="Meeting Notes"
  type="note"
  content="Important points from today's meeting...Important points from ay's meeting...Important points from ay's meeting...Important points from ay's meeting...Important points from today's meeting..."
/>


<Card 
  title="Cool Video"
  type="url"
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
/>

<Card 
  title="Tweet Link"
  type="url"
  url="https://x.com/Ibelick/status/1879438246872273159"
/>
</div>
   {/* <div className="flex gap-2">

   <Chips text={"Links"}/>
   <Chips text={"Notes"}/>
   <Chips text={"Date"}/>
   <Chips text={"Random"}/>
   </div> */}


    </div>;
}

export default App;
