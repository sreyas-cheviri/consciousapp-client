import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useContent() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setContent(response.data.content);
      setError(null);
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to fetch content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Return more data for better flexibility
  return {
    content,
    isLoading,
    error,
    refetch: fetchContent,
    updateContent: setContent
  };
}