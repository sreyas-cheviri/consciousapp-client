import { Button } from "./components/Button";
import { AddIcon } from "./icons/AddIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return <div className="m-10 ">
   {/* <Button variant="primary" text="Add Content" size="lg" startIcon ={<AddIcon/>}/> */}
   <Button variant="secondary" text="Share Brain" size="sm" startIcon ={<ShareIcon/>}/>
   <Button variant="primary" text="Add Content" size="sm" startIcon ={<AddIcon/>}/>
   {/* <Button variant="secondary" text="Add Content" size="md" startIcon ={<AddIcon/>}/> */}

    </div>;
}

export default App;
