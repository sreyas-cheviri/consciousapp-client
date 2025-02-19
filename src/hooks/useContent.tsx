import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL; // Define your API URL here

export function useContent() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContent(response.data.content);
      });
  }, []);
  return content;
}
