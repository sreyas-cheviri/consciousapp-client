import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

// const API_URL = import.meta.env.VITE_FE_URL;

export default function SharedPage() {
  const { hash } = useParams();
  console.log(hash);
  
  interface CardType {
    id: string;
    title: string;
    type: string;
    content: string;
    link: string;
  }

  const [content, setContent] = useState<CardType[]>([]);

  const [name, setName] = useState<string>("");

  useEffect(() => {
    axios
      .get(`/api/v1/brain/${hash}`) // No need to manually include API_URL
      .then((response) => {
        setContent(response.data.content);
        console.log(content);
        setName(response.data.username);
      });
}, [hash, content]);


  return (
    <div className=" ">
            <Link to="/">
        <div className="flex justify-center items-center p-10 gap-1">
        <img
            src="../src/assets/logo.png"
            alt=""
            className="h-8 rounded-full border-gray-500 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
          />
       
       <h1 className="flex justify-center p-4 text-4xl italic font-serif text-gray-300"> Conscious </h1>
        </div>
       </Link>
        
<h1 className="text-white flex justify-center text-xl ">Shared Brain From {name} </h1>
    <div className="flex  gap-2 flex-wrap md:justify-center  max-w-6xl md:min-w-[1154px] border-gray-500/10 border mx-auto justify-center  mt-8 p-3 rounded-lg bg-zinc-600/3 transition-all duration-300 ">
      {content
        .slice()
        .reverse()
        .map((card) => (
            <Card
            key={card.id}
            title={card.title}
            type={card.type}
            content={card.content}
            url={card.link}
            />
        ))}
    </div>
        </div>
  );
}
