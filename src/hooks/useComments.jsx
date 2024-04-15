import { useEffect, useState } from "react";

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [reloadToggle, setReloadToggle] = useState(false);
  const refetch = () => {
    setReloadToggle(!reloadToggle);
  };

  useEffect(() => {
    setIsloading(true);
    fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data || []);
        setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err);
      });
  }, [reloadToggle]);

  return { comments, refetch, isLoading };
};

export default useComments;
