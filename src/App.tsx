import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { AddIcon } from "./icons/AddIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return <div className="m-0 h-svh  bg-zinc-900">
  
   <div className=" flex gap-20 ">
   <Button variant="secondary" text="Share Brain" size="sm" startIcon ={<ShareIcon/>}/>
   <Button variant="primary" text="Add Content" size="sm" startIcon ={<AddIcon/>}/>
   </div>

   <Card/>

    </div>;
}

export default App;
